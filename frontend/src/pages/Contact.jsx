import React from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import NewsLetterBox from '../components/NewsLetterBox'
import usePageTitle from '../hooks/usePageTitle'

const details = [
  { emoji: '📍', title: 'Visit us', lines: ['Trendify Store', 'Bengaluru, Karnataka, India'], color: 'bg-bubble-light' },
  { emoji: '📞', title: 'Call us', lines: ['+91 98765 43210', 'Mon–Sat, 10am–7pm'], color: 'bg-sky-light' },
  { emoji: '💌', title: 'Email', lines: ['support@trendify.in', 'We reply within 24 hours'], color: 'bg-mint-light' },
  { emoji: '⏰', title: 'Store hours', lines: ['Mon–Sat: 10am – 9pm', 'Sunday: 11am – 6pm'], color: 'bg-lemon-light' },
]

const Contact = () => {
  usePageTitle('Contact Us')

  return (
    <div className='pt-12'>
      <Title text1='Come say' text2='hi!' color='mint' note="we don't bite 🐝" subtitle="Questions about an order, sizing or returns? We're always happy to help." />

      <section className='grid items-center gap-12 md:grid-cols-2 lg:gap-16'>
        <div className='relative'>
          <div className='absolute -inset-3 bg-bubble border-2 border-ink rounded-[2.5rem] rotate-2' />
          <img className='relative object-cover w-full border-2 border-ink rounded-[2rem] aspect-[4/3] shadow-pop-lg -rotate-1' src={assets.contact_img} alt='Trendify store' />
        </div>
        <div className='grid gap-4 sm:grid-cols-2'>
          {details.map(({ emoji, title, lines, color }) => (
            <div key={title} className={`p-6 border-2 border-ink rounded-3xl shadow-pop ${color}`}>
              <span className='text-3xl'>{emoji}</span>
              <p className='mt-3 text-lg font-bold font-display'>{title}</p>
              {lines.map((line) => (
                <p key={line} className='mt-1 text-sm font-semibold text-ink/70'>{line}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className='flex flex-col items-start justify-between gap-6 p-8 mt-20 border-2 sm:flex-row sm:items-center bg-lilac border-ink rounded-[2rem] shadow-pop sm:p-10'>
        <div>
          <p className='text-2xl font-bold font-display'>Careers at Trendify 🚀</p>
          <p className='mt-2 font-semibold text-ink/75'>Join our crew and help shape the future of everyday fashion.</p>
        </div>
        <a href='mailto:careers@trendify.in' className='btn-outline'>Explore jobs</a>
      </section>

      <NewsLetterBox />
    </div>
  )
}

export default Contact
