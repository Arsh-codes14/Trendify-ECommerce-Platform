import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth, useUser } from '@clerk/clerk-react'
import { Lock } from 'lucide-react'
import CartTotal from '../components/CartTotal'
import CheckoutSteps from '../components/CheckoutSteps'
import { ShopContext } from '../context/ShopContext'
import usePageTitle from '../hooks/usePageTitle'
import loadRazorpay from '../utils/loadRazorpay'

const PlaceOrder = () => {
  usePageTitle('Checkout')
  const [submitting, setSubmitting] = useState(false)
  const [method, setMethod] = useState('Razorpay')
  const { navigate, backendUrl, getCartLines, clearCart, formatINR, productsLoading } = useContext(ShopContext)
  const { getToken } = useAuth()
  const { user } = useUser()
  const lines = getCartLines()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: 'India',
    phone: '',
  })

  // INFO: Prefill contact details from the signed-in Clerk profile
  useEffect(() => {
    if (!user) return
    setFormData((prev) => ({
      ...prev,
      firstName: prev.firstName || user.firstName || '',
      lastName: prev.lastName || user.lastName || '',
      email: prev.email || user.primaryEmailAddress?.emailAddress || '',
    }))
  }, [user])

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (lines.length === 0) {
      toast.error('Your bag is empty')
      return
    }

    // Send only ids, sizes and quantities; the server looks up the prices
    const items = lines.map(({ product, size, quantity }) => ({ productId: product._id, size, quantity }))

    setSubmitting(true)
    try {
      const token = await getToken()
      const headers = { Authorization: `Bearer ${token}` }
      const response = await axios.post(
        `${backendUrl}/api/order/place`,
        { items, address: formData, paymentMethod: method },
        { headers }
      )

      if (!response.data.success) {
        toast.error(response.data.message)
        setSubmitting(false)
      } else if (method === 'COD') {
        clearCart()
        navigate(`/order-success/${response.data.orderId}`)
      } else {
        // Card / UPI: the button stays busy until the popup finishes
        await openRazorpay(response.data.razorpay, headers)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || 'Could not place your order. Please try again.')
      setSubmitting(false)
    }
  }

  // INFO: Opens the Razorpay popup; on success the backend verifies the payment signature
  const openRazorpay = async (razorpayOrder, headers) => {
    if (!(await loadRazorpay())) {
      toast.error('Could not load the payment window. Check your connection and try again.')
      setSubmitting(false)
      return
    }

    const checkout = new window.Razorpay({
      key: razorpayOrder.keyId,
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: 'Trendify',
      description: 'Order payment',
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone,
      },
      theme: { color: '#FF6FAE' },
      handler: async (payment) => {
        try {
          const { data } = await axios.post(`${backendUrl}/api/order/verify`, payment, { headers })
          clearCart()
          navigate(`/order-success/${data.orderId}`, { state: { paidOnline: true } })
        } catch (error) {
          console.error(error)
          toast.error(error.response?.data?.message || 'Payment could not be verified')
          setSubmitting(false)
        }
      },
      modal: {
        ondismiss: () => {
          toast.info('Payment cancelled. Your bag is still here 🛍️')
          setSubmitting(false)
        },
      },
    })

    checkout.on('payment.failed', (event) => {
      toast.error(event.error?.description || 'Payment failed. Please try again.')
    })
    checkout.open()
  }

  if (productsLoading) return <div className='min-h-[50vh]' />

  if (lines.length === 0) {
    return (
      <div className='flex flex-col items-center gap-4 py-24 text-center'>
        <p className='text-6xl'>🛍️</p>
        <p className='text-3xl font-bold font-display'>Your bag is empty</p>
        <Link to='/collection' className='btn-primary'>Continue shopping</Link>
      </div>
    )
  }

  const paymentOptions = [
    { id: 'Razorpay', emoji: '💳', title: 'Card / UPI', text: 'Cards, UPI, netbanking via Razorpay' },
    { id: 'COD', emoji: '💸', title: 'Cash on Delivery', text: 'Pay when your order arrives' },
  ]

  // Shorthand for a labelled text input
  const field = (name, label, props = {}) => (
    <label className='flex flex-col gap-1.5'>
      <span className='text-sm font-bold'>{label}</span>
      <input required name={name} value={formData[name]} onChange={onChangeHandler} className='input' {...props} />
    </label>
  )

  return (
    <form onSubmit={onSubmitHandler} className='pt-12'>
      <CheckoutSteps current={1} />

      <div className='grid gap-10 lg:grid-cols-[1fr_420px]'>
        {/* Delivery details */}
        <div className='flex flex-col gap-8'>
          <section className='p-6 card sm:p-8'>
            <h2 className='flex items-center gap-2 mb-6 text-xl font-bold'><span className='text-2xl'>👋</span> Who's it for?</h2>
            <div className='grid gap-4 sm:grid-cols-2'>
              {field('firstName', 'First name', { autoComplete: 'given-name' })}
              {field('lastName', 'Last name', { autoComplete: 'family-name' })}
              {field('email', 'Email', { type: 'email', autoComplete: 'email' })}
              {field('phone', 'Mobile number', { type: 'tel', autoComplete: 'tel', pattern: '\\+?[0-9\\s\\-]{7,15}', title: 'Enter a valid phone number' })}
            </div>
          </section>

          <section className='p-6 card sm:p-8'>
            <h2 className='flex items-center gap-2 mb-6 text-xl font-bold'><span className='text-2xl'>🏡</span> Where should we send it?</h2>
            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='sm:col-span-2'>{field('street', 'Street address', { autoComplete: 'street-address' })}</div>
              {field('city', 'City', { autoComplete: 'address-level2' })}
              {field('state', 'State', { autoComplete: 'address-level1' })}
              {field('zipcode', 'PIN code', { inputMode: 'numeric', pattern: '[0-9]{4,10}', title: 'Enter a valid PIN code', autoComplete: 'postal-code' })}
              {field('country', 'Country', { autoComplete: 'country-name' })}
            </div>
          </section>

          <section className='p-6 card sm:p-8'>
            <h2 className='flex items-center gap-2 mb-6 text-xl font-bold'><span className='text-2xl'>💳</span> How would you like to pay?</h2>
            <div className='grid gap-4 sm:grid-cols-2' role='radiogroup' aria-label='Payment method'>
              {paymentOptions.map((option) => (
                <button
                  key={option.id}
                  type='button'
                  role='radio'
                  aria-checked={method === option.id}
                  onClick={() => setMethod(option.id)}
                  className={`flex items-center gap-3 p-4 text-left border-2 border-ink rounded-2xl transition-all ${
                    method === option.id ? 'bg-mint shadow-pop-sm -translate-y-0.5' : 'bg-white hover:bg-lemon-light'
                  }`}
                >
                  <span className='text-2xl'>{option.emoji}</span>
                  <div>
                    <p className='font-bold font-display'>{option.title}</p>
                    <p className='text-xs font-semibold text-ink/70'>{option.text}</p>
                  </div>
                </button>
              ))}
            </div>
            {method === 'Razorpay' && (
              <p className='mt-4 text-sm font-semibold text-ink/70'>🔒 You'll pay securely in the Razorpay window after clicking the button.</p>
            )}
          </section>
        </div>

        {/* Order summary */}
        <aside className='p-6 card h-fit lg:sticky lg:top-28'>
          <h2 className='mb-5 text-xl font-bold'>Your goodies</h2>
          <ul className='flex flex-col gap-4 pb-5 mb-5 border-b-2 border-dashed border-ink/30'>
            {lines.map(({ product, size, quantity }) => (
              <li key={product._id + size} className='flex items-center gap-3'>
                <div className='relative w-14 shrink-0'>
                  <img src={product.image[0]} alt={product.name} className='object-cover w-full border-2 border-ink rounded-xl aspect-[13/15]' />
                  <span className='absolute flex items-center justify-center w-6 h-6 text-[11px] font-extrabold border-2 rounded-full -top-2 -right-2 bg-lemon border-ink'>{quantity}</span>
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-bold line-clamp-1'>{product.name}</p>
                  <p className='text-xs font-semibold text-ink/60'>Size {size}</p>
                </div>
                <p className='text-sm font-bold'>{formatINR(product.price * quantity)}</p>
              </li>
            ))}
          </ul>
          <CartTotal />
          <button type='submit' disabled={submitting} className='w-full mt-6 btn-primary'>
            {submitting ? 'Please wait… ⏳' : method === 'Razorpay' ? 'Pay now 💳' : 'Place order 🎉'}
          </button>
          <p className='flex items-center justify-center gap-1.5 mt-4 text-xs font-semibold text-ink/60'>
            <Lock size={12} /> Your details are sent securely
          </p>
        </aside>
      </div>
    </form>
  )
}

export default PlaceOrder
