import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { assets } from '../assets/assets'
import { ShopContext, FREE_SHIPPING_THRESHOLD } from '../context/ShopContext'
import { Sparkle } from './Decor'

// A word with a highlighter swash behind it
const Marker = ({ children, color }) => (
  <span className='relative inline-block'>
    <span className={`absolute inset-x-[-6px] bottom-[0.12em] h-[0.35em] rounded-full -rotate-1 ${color}`} />
    <span className='relative'>{children}</span>
  </span>
)

// Round lemon badge with text that slowly spins around the edge
const SpinningBadge = ({ text }) => (
  <div className='absolute z-10 -top-8 -right-3 sm:-right-8 w-28 h-28 sm:w-32 sm:h-32'>
    <div className='absolute inset-0 border-2 rounded-full bg-lemon border-ink shadow-pop' />
    <svg viewBox='0 0 100 100' className='absolute inset-0 animate-spin-slow' aria-hidden='true'>
      <defs>
        <path id='badge-circle' d='M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0' />
      </defs>
      <text fontSize='10' fontWeight='700' fill='#2D1B3D' fontFamily='Fredoka, sans-serif'>
        <textPath href='#badge-circle' textLength='222' lengthAdjust='spacing'>{text}</textPath>
      </text>
    </svg>
    <span className='absolute inset-0 flex items-center justify-center text-3xl'>🚚</span>
  </div>
)

const Hero = () => {
  const { products, formatINR } = useContext(ShopContext)

  const stats = [
    { value: products.length ? `${products.length}+ styles` : 'New styles', color: 'bg-lemon', rotate: '-rotate-2' },
    { value: 'COD 💸', color: 'bg-lilac', rotate: 'rotate-1' },
    { value: '10-day returns ↺', color: 'bg-peach', rotate: '-rotate-1' },
  ]

  return (
    <section className='relative grid items-center py-12 gap-14 md:grid-cols-2 lg:py-20'>
      {/* Floating sparkles */}
      <Sparkle className='absolute hidden w-9 h-9 md:block top-6 left-[46%] text-mint animate-float' />
      <Sparkle className='absolute hidden w-6 h-6 md:block bottom-6 left-[40%] text-bubble animate-float [animation-delay:1.5s]' />
      <Sparkle className='absolute hidden w-5 h-5 md:block top-1/2 -left-2 text-lemon animate-float [animation-delay:0.8s]' />

      <div>
        <span className='text-sm sticker bg-mint -rotate-2 shadow-pop-sm'>✦ New season drop</span>

        <h1 className='mt-7 text-5xl font-bold leading-[1.08] sm:text-6xl lg:text-7xl'>
          Dress <Marker color='bg-bubble'>cute.</Marker>
          <br />
          Feel <Marker color='bg-mint'>fun.</Marker>
          <br />
          Be <span className='text-bubble-dark'>you.</span>
        </h1>

        <p className='max-w-md mt-6 text-lg text-ink/75'>
          Comfy everyday fashion for women, men and kids, with Cash on Delivery and returns that
          are actually easy.
        </p>

        <div className='flex flex-wrap gap-4 mt-8'>
          <Link to='/collection' className='btn-primary'>
            Shop the drop <ArrowRight size={18} />
          </Link>
          <a href='#bestsellers' className='btn-outline'>
            Best sellers ★
          </a>
        </div>

        <div className='flex flex-wrap gap-3 mt-10'>
          {stats.map((stat) => (
            <span key={stat.value} className={`sticker text-sm normal-case ${stat.color} ${stat.rotate}`}>
              {stat.value}
            </span>
          ))}
        </div>
      </div>

      <div className='relative w-full max-w-xl mx-auto'>
        <div className='absolute -inset-3 sm:-inset-5 bg-lilac border-2 border-ink rounded-[2.5rem] rotate-3' />
        <img
          src={assets.hero_img}
          alt='Trendify new season collection'
          className='relative w-full border-2 border-ink rounded-[2rem] shadow-pop-lg -rotate-2 transition-transform duration-500 hover:rotate-0'
        />
        <SpinningBadge text={`FREE SHIPPING ✦ OVER ${formatINR(FREE_SHIPPING_THRESHOLD)} ✦ `} />
        <span className='absolute text-sm bg-white -bottom-5 -left-2 sticker shadow-pop animate-wiggle'>
          💸 Cash on Delivery
        </span>
        <p className='absolute hidden text-2xl sm:block -bottom-14 right-4 font-hand text-bubble-dark rotate-3'>
          psst… easy returns! ↺
        </p>
      </div>
    </section>
  )
}

export default Hero
