import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Lock, Trash2 } from 'lucide-react'
import { ShopContext } from '../context/ShopContext'
import { getCategoryStyle } from '../theme'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import QuantityStepper from '../components/QuantityStepper'
import usePageTitle from '../hooks/usePageTitle'

const Cart = () => {
  usePageTitle('Shopping Bag')
  const { getCartLines, getCartCount, updateQuantity, navigate, formatINR, productsLoading } = useContext(ShopContext)
  const lines = getCartLines()
  const count = getCartCount()

  if (productsLoading) return <div className='min-h-[50vh]' />

  if (lines.length === 0) {
    return (
      <div className='flex flex-col items-center gap-4 py-24 text-center'>
        <span className='flex items-center justify-center text-5xl border-2 rounded-full w-28 h-28 bg-bubble-light border-ink shadow-pop animate-float'>
          🥺
        </span>
        <p className='mt-4 text-3xl font-bold font-display'>Your bag is feeling lonely</p>
        <p className='max-w-sm text-ink/70'>Nothing in here yet. Let's find something cute to fill it up!</p>
        <Link to='/collection' className='mt-2 btn-primary'>Start shopping <ArrowRight size={18} /></Link>
      </div>
    )
  }

  return (
    <div className='pt-12'>
      <Title text1='Your' text2='bag' color='bubble' note='looking good! ✿' subtitle={`${count} item${count === 1 ? '' : 's'} ready to go home with you`} />

      <div className='grid gap-10 lg:grid-cols-[1fr_400px]'>
        {/* Items */}
        <ul className='flex flex-col gap-5'>
          {lines.map(({ product, size, quantity }) => (
            <li key={product._id + size} className='flex gap-4 p-4 sm:gap-6 card'>
              <Link
                to={`/product/${product._id}`}
                className={`self-start w-24 sm:w-28 shrink-0 p-1.5 border-2 border-ink rounded-2xl ${getCategoryStyle(product.category).tint}`}
              >
                <img src={product.image[0]} alt={product.name} className='object-cover w-full rounded-xl aspect-[13/15]' />
              </Link>

              <div className='flex flex-col flex-1 min-w-0'>
                <div className='flex justify-between gap-4'>
                  <div className='min-w-0'>
                    <Link to={`/product/${product._id}`} className='font-bold font-display hover:text-bubble-dark line-clamp-2'>{product.name}</Link>
                    <div className='flex flex-wrap items-center gap-2 mt-2 text-sm'>
                      <span className='sticker bg-lilac-light !text-[11px]'>Size {size}</span>
                      <span className='text-ink/60'>{formatINR(product.price)} each</span>
                    </div>
                  </div>
                  <p className='text-lg font-bold font-display whitespace-nowrap'>{formatINR(product.price * quantity)}</p>
                </div>

                <div className='flex items-center justify-between pt-4 mt-auto'>
                  <QuantityStepper size='sm' value={quantity} onChange={(qty) => updateQuantity(product._id, size, qty)} />
                  <button
                    onClick={() => updateQuantity(product._id, size, 0)}
                    className='inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold rounded-full hover:bg-bubble-light'
                  >
                    <Trash2 size={15} /> <span className='hidden sm:inline'>Remove</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Summary */}
        <aside className='p-6 card h-fit lg:sticky lg:top-28'>
          <p className='mb-5 text-xl font-bold font-display'>Order summary</p>
          <CartTotal />
          <button onClick={() => navigate('/place-order')} className='w-full mt-6 btn-primary'>
            Checkout <ArrowRight size={18} />
          </button>
          <p className='flex items-center justify-center gap-1.5 mt-4 text-xs font-semibold text-ink/60'>
            <Lock size={12} /> Secure checkout · Cash on Delivery
          </p>
          <Link to='/collection' className='block mt-3 text-sm font-bold text-center underline hover:text-bubble-dark'>
            Keep shopping
          </Link>
        </aside>
      </div>
    </div>
  )
}

export default Cart
