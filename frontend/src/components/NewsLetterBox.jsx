import React from 'react'
import { toast } from 'react-toastify'
import { Sparkle } from './Decor'

const NewsLetterBox = () => {

  const onSubmitHandler = (event) => {
    event.preventDefault();
    toast.success('Yay! You\'re in 💌 Check your inbox for your 20% off code.');
    event.target.reset();
  }

  return (
    <section className='relative px-6 py-12 my-14 border-2 sm:px-12 bg-bubble border-ink rounded-[2rem] shadow-pop-lg'>
      <Sparkle className='absolute w-10 h-10 -top-5 left-10 text-lemon animate-float' />
      <Sparkle className='absolute hidden w-7 h-7 sm:block -bottom-4 right-16 text-mint animate-float [animation-delay:1.2s]' />

      <div className='grid items-center gap-8 lg:grid-cols-2'>
        <div>
          <p className='text-2xl font-hand -rotate-2'>psst, join the club!</p>
          <h2 className='mt-1 text-3xl font-bold sm:text-4xl'>Get 20% off your <span className='whitespace-nowrap'>first order 💌</span></h2>
          <p className='mt-3 font-semibold text-ink/75'>New drops, style tips and members-only treats.</p>
        </div>
        <div>
          <form onSubmit={onSubmitHandler} className='flex flex-col gap-3 sm:flex-row'>
            <input
              className='flex-1 px-5 py-3 font-semibold bg-white border-2 rounded-full outline-none border-ink placeholder:text-ink/40 focus:ring-4 focus:ring-lemon'
              type='email'
              placeholder='you@example.com'
              aria-label='Email address'
              required
            />
            <button type='submit' className='btn-primary !bg-lemon'>
              Subscribe
            </button>
          </form>
          <p className='mt-3 text-xl font-hand'>no spam, pinky promise 🤞</p>
        </div>
      </div>
    </section>
  )
}

export default NewsLetterBox
