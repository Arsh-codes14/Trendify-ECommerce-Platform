import React, { useContext } from 'react'
import { ShopContext, FREE_SHIPPING_THRESHOLD } from '../context/ShopContext'

const OurPolicy = () => {
  const { formatINR } = useContext(ShopContext)

  const policies = [
    { emoji: '🚚', title: 'Free Shipping', text: `On orders over ${formatINR(FREE_SHIPPING_THRESHOLD)}`, color: 'bg-mint-light', tilt: 'hover:-rotate-2' },
    { emoji: '💸', title: 'Cash on Delivery', text: 'Pay when it reaches you', color: 'bg-lemon-light', tilt: 'hover:rotate-2' },
    { emoji: '↺', title: 'Easy Returns', text: 'Changed your mind? 10 days', color: 'bg-lilac-light', tilt: 'hover:-rotate-2' },
    { emoji: '🔒', title: 'Secure Checkout', text: 'Protected sign-in & orders', color: 'bg-peach-light', tilt: 'hover:rotate-2' },
  ]

  return (
    <section className='grid grid-cols-2 gap-4 my-14 lg:grid-cols-4 sm:gap-6'>
      {policies.map((policy) => (
        <div
          key={policy.title}
          className={`flex flex-col items-center gap-3 p-5 text-center border-2 border-ink rounded-3xl shadow-pop transition-transform sm:flex-row sm:text-left ${policy.color} ${policy.tilt}`}
        >
          <span className='flex items-center justify-center text-2xl font-bold bg-white border-2 rounded-full w-14 h-14 shrink-0 border-ink'>
            {policy.emoji}
          </span>
          <div>
            <p className='font-bold font-display'>{policy.title}</p>
            <p className='text-sm text-ink/70'>{policy.text}</p>
          </div>
        </div>
      ))}
    </section>
  )
}

export default OurPolicy
