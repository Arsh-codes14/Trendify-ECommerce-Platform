import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import { Sparkle } from '../components/Decor'
import usePageTitle from '../hooks/usePageTitle'

const OrderSuccess = () => {
  usePageTitle('Order confirmed')
  const { orderId } = useParams()
  const paidOnline = useLocation().state?.paidOnline

  return (
    <div className='pt-12'>
      <CheckoutSteps current={3} />
      <div className='relative flex flex-col items-center max-w-xl gap-4 px-6 py-14 mx-auto text-center border-2 bg-mint-light border-ink rounded-[2rem] shadow-pop-lg'>
        <Sparkle className='absolute w-10 h-10 -top-5 left-12 text-lemon animate-float' />
        <Sparkle className='absolute w-8 h-8 -top-4 right-16 text-bubble animate-float [animation-delay:0.7s]' />
        <Sparkle className='absolute w-6 h-6 bottom-8 -right-3 text-lilac animate-float [animation-delay:1.4s]' />

        <span className='flex items-center justify-center w-24 h-24 text-5xl bg-white border-2 rounded-full border-ink shadow-pop animate-wiggle'>
          🎉
        </span>
        <h1 className='mt-2 text-4xl font-bold'>Yay! Order placed</h1>
        <p className='text-lg text-ink/75'>
          Order <span className='px-2 font-bold rounded-full bg-lemon'>#{orderId.slice(-8).toUpperCase()}</span> is
          on its way to being packed.{' '}
          {paidOnline ? 'Your payment was successful 💳' : "You'll pay in cash when it arrives."}
        </p>
        <p className='text-2xl font-hand text-bubble-dark -rotate-2'>thank you for shopping with us ♡</p>
        <div className='flex flex-wrap justify-center gap-4 mt-4'>
          <Link to='/orders' className='btn-primary'>Track my order 📦</Link>
          <Link to='/collection' className='btn-outline'>Keep shopping</Link>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess
