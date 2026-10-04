import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '@clerk/clerk-react'
import { RefreshCw } from 'lucide-react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import usePageTitle from '../hooks/usePageTitle'

const STEPS = [
  { status: 'Order Placed', emoji: '📝' },
  { status: 'Packing', emoji: '📦' },
  { status: 'Shipped', emoji: '🚚' },
  { status: 'Out for Delivery', emoji: '🛵' },
  { status: 'Delivered', emoji: '🏡' },
]

// INFO: Emoji tracker showing how far along an order is
const StatusTracker = ({ status }) => {
  if (status === 'Cancelled') {
    return <p className='sticker bg-peach'>✖ Cancelled</p>
  }

  const current = STEPS.findIndex((step) => step.status === status)

  return (
    <ol className='grid grid-cols-5'>
      {STEPS.map((step, index) => {
        const done = index <= current
        return (
          <li key={step.status} className='relative flex flex-col items-center text-center'>
            {/* dashed line to the previous step, solid once reached */}
            {index > 0 && (
              <span className={`absolute top-5 right-1/2 w-full border-t-[3px] ${done ? 'border-ink' : 'border-dashed border-ink/25'}`} />
            )}
            <span className={`relative z-10 flex items-center justify-center w-10 h-10 text-lg rounded-full border-2 transition ${
              done ? 'bg-mint border-ink' : 'bg-white border-ink/25 grayscale opacity-50'
            } ${index === current ? 'shadow-pop-sm scale-110' : ''}`}>
              {step.emoji}
            </span>
            <span className={`mt-2 text-[10px] sm:text-xs font-bold ${index === current ? 'text-ink' : 'text-ink/45'}`}>{step.status}</span>
          </li>
        )
      })}
    </ol>
  )
}

const Orders = () => {
  usePageTitle('My Orders')
  const { backendUrl, resolveImage, formatINR } = useContext(ShopContext)
  const { getToken } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const loadOrders = useCallback(async () => {
    setLoading(true)
    try {
      const token = await getToken()
      const response = await axios.get(`${backendUrl}/api/order/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || 'Could not load your orders')
    } finally {
      setLoading(false)
    }
  }, [backendUrl, getToken])

  useEffect(() => {
    loadOrders()
  }, [loadOrders])

  return (
    <div className='pt-12'>
      <div className='flex flex-wrap items-start justify-between gap-4'>
        <Title text1='My' text2='orders' color='sky' note='where my goodies at?' subtitle='Track everything you have ordered, step by step.' />
        <button onClick={loadOrders} className='btn-outline !py-2 text-sm' aria-label='Refresh orders'>
          <RefreshCw size={15} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {loading && orders.length === 0 && (
        <div className='flex flex-col gap-6'>
          {[1, 2].map((key) => <div key={key} className='h-56 border-2 animate-pulse rounded-3xl border-ink/15 bg-lilac-light' />)}
        </div>
      )}

      {!loading && orders.length === 0 && (
        <div className='flex flex-col items-center gap-4 py-20 text-center'>
          <span className='flex items-center justify-center text-5xl border-2 rounded-full w-28 h-28 bg-sky-light border-ink shadow-pop animate-float'>📦</span>
          <p className='mt-4 text-3xl font-bold font-display'>No orders yet</p>
          <p className='text-ink/70'>Your future favourites are just a few clicks away.</p>
          <Link to='/collection' className='btn-primary'>Start shopping</Link>
        </div>
      )}

      <div className='flex flex-col gap-8'>
        {orders.map((order) => (
          <article key={order._id} className='overflow-hidden card'>
            {/* Order header */}
            <div className='flex flex-wrap items-center justify-between px-6 py-4 border-b-2 gap-x-8 gap-y-3 border-ink bg-lemon-light'>
              <div>
                <p className='text-xs font-bold uppercase text-ink/50'>Order</p>
                <p className='font-bold font-display'>#{order._id.slice(-8).toUpperCase()}</p>
              </div>
              <div>
                <p className='text-xs font-bold uppercase text-ink/50'>Placed on</p>
                <p className='font-semibold'>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
              <div>
                <p className='text-xs font-bold uppercase text-ink/50'>Payment</p>
                <p className='font-semibold'>{order.paymentMethod} · {order.payment ? 'Paid ✓' : 'Pending'}</p>
              </div>
              <div>
                <p className='text-xs font-bold uppercase text-ink/50'>Total</p>
                <p className='font-bold font-display'>{formatINR(order.amount)}</p>
              </div>
            </div>

            <div className='px-4 py-6 border-b-2 border-dashed sm:px-6 border-ink/20'>
              <StatusTracker status={order.status} />
            </div>

            {/* Items */}
            <ul className='px-6 divide-y-2 divide-dashed divide-ink/10'>
              {order.items.map((item, index) => (
                <li key={index} className='flex items-center gap-4 py-4'>
                  <img className='object-cover w-16 border-2 border-ink rounded-xl aspect-[13/15]' src={resolveImage(item.image)} alt={item.name} />
                  <div className='flex-1 min-w-0'>
                    <p className='font-bold line-clamp-1'>{item.name}</p>
                    <p className='mt-1 text-sm font-semibold text-ink/60'>Size {item.size} · Qty {item.quantity}</p>
                  </div>
                  <p className='font-bold font-display'>{formatINR(item.price * item.quantity)}</p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Orders
