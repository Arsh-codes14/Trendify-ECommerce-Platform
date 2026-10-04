import React, { useContext } from 'react'
import { ShopContext, FREE_SHIPPING_THRESHOLD } from '../context/ShopContext'

// INFO: Subtotal, shipping and total, with a progress bar towards free shipping
const CartTotal = () => {
  const { getCartAmount, getDeliveryFee, formatINR } = useContext(ShopContext)

  const subtotal = getCartAmount()
  const deliveryFee = getDeliveryFee()
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)

  return (
    <div className='w-full'>
      {subtotal > 0 && (
        <div className='p-4 mb-5 border-2 border-ink rounded-2xl bg-lemon-light'>
          <p className='text-sm font-semibold'>
            {remaining > 0 ? (
              <>🚚 Add <b>{formatINR(remaining)}</b> more for <b>free shipping</b></>
            ) : (
              <>🎉 Woohoo! You've unlocked <b>free shipping</b></>
            )}
          </p>
          {/* Candy-striped progress bar */}
          <div className='h-4 mt-3 overflow-hidden bg-white border-2 rounded-full border-ink'>
            <div
              className='h-full transition-all duration-700 bg-bubble'
              style={{
                width: `${progress}%`,
                backgroundImage: 'repeating-linear-gradient(45deg, transparent 0 8px, rgba(255,255,255,0.35) 8px 16px)',
              }}
            />
          </div>
        </div>
      )}

      <dl className='flex flex-col gap-3'>
        <div className='flex justify-between'>
          <dt className='text-ink/70'>Subtotal</dt>
          <dd className='font-bold'>{formatINR(subtotal)}</dd>
        </div>
        <div className='flex justify-between'>
          <dt className='text-ink/70'>Shipping</dt>
          <dd className='font-bold'>
            {subtotal > 0 && deliveryFee === 0 ? <span className='px-2 rounded-full bg-mint'>FREE</span> : formatINR(deliveryFee)}
          </dd>
        </div>
        <div className='flex justify-between pt-4 mt-1 text-xl border-t-2 border-dashed border-ink/30'>
          <dt className='font-bold font-display'>Total</dt>
          <dd className='font-bold font-display'>{formatINR(subtotal + deliveryFee)}</dd>
        </div>
      </dl>
    </div>
  )
}

export default CartTotal
