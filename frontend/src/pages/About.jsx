import React from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import NewsLetterBox from '../components/NewsLetterBox'
import usePageTitle from '../hooks/usePageTitle'

const values = [
  {
    emoji: '💎',
    title: 'Quality you can feel',
    text: 'Every piece is chosen and checked for comfort, fit and finish, so you can shop with confidence.',
    color: 'bg-sky-light',
  },
  {
    emoji: '🛵',
    title: 'Shopping made easy',
    text: 'Easy browsing, Cash on Delivery and simple 10-day returns make getting your goodies effortless.',
    color: 'bg-mint-light',
  },
  {
    emoji: '🤗',
    title: 'Humans who care',
    text: 'Our support team is here to help with any question, before and after your order arrives.',
    color: 'bg-bubble-light',
  },
]

const About = () => {
  usePageTitle('About Us')

  return (
    <div className='pt-12'>
      <section className='grid items-center gap-12 md:grid-cols-2 lg:gap-16'>
        <div className='relative'>
          <div className='absolute -inset-3 bg-mint border-2 border-ink rounded-[2.5rem] -rotate-3' />
          <img className='relative object-cover w-full border-2 border-ink rounded-[2rem] aspect-[4/3] shadow-pop-lg rotate-1' src={assets.about_img} alt='Trendify collection flat lay' />
        </div>
        <div>
          <Title text1='Hello, we are' text2='Trendify' color='bubble' note='nice to meet you!' />
          <div className='flex flex-col gap-4 text-lg leading-relaxed text-ink/80'>
            <p>
              We make getting dressed the fun part of your day. Trendify brings you comfy, cute and
              fairly priced everyday fashion for the whole family.
            </p>
            <p>
              From the moment you browse to the day your parcel arrives, we keep things simple:
              honest prices, Cash on Delivery and returns that are actually easy.
            </p>
          </div>
          <div className='grid gap-4 mt-8 sm:grid-cols-2'>
            <div className='p-5 border-2 border-ink rounded-3xl bg-lemon-light'>
              <p className='font-bold font-display'>🎯 Our mission</p>
              <p className='mt-2 text-sm text-ink/75'>Help everyone express their style with accessible, quality fashion.</p>
            </div>
            <div className='p-5 border-2 border-ink rounded-3xl bg-lilac-light'>
              <p className='font-bold font-display'>🌈 Our vision</p>
              <p className='mt-2 text-sm text-ink/75'>Become India's happiest place to shop for everyday style.</p>
            </div>
          </div>
        </div>
      </section>

      <section className='mt-24'>
        <Title text1='Why people' text2='love us' color='lemon' align='center' />
        <div className='grid gap-6 md:grid-cols-3'>
          {values.map(({ emoji, title, text, color }, index) => (
            <div key={title} className={`p-8 border-2 border-ink rounded-3xl shadow-pop transition-transform ${color} ${index % 2 ? 'hover:rotate-1' : 'hover:-rotate-1'}`}>
              <span className='flex items-center justify-center text-3xl bg-white border-2 rounded-full w-14 h-14 border-ink'>{emoji}</span>
              <p className='mt-5 text-xl font-bold font-display'>{title}</p>
              <p className='mt-2 leading-relaxed text-ink/75'>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <NewsLetterBox />
    </div>
  )
}

export default About
