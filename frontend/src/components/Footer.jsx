import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import Logo from './Logo'

const columns = [
  {
    title: 'Shop',
    links: [
      { to: '/collection?category=Women', label: '👗 Women' },
      { to: '/collection?category=Men', label: '👕 Men' },
      { to: '/collection?category=Kids', label: '🧸 Kids' },
      { to: '/collection', label: '✨ All Products' },
    ],
  },
  {
    title: 'Help',
    links: [
      { to: '/orders', label: 'Track Orders' },
      { to: '/wishlist', label: 'Wishlist' },
      { to: '/cart', label: 'Shopping Bag' },
      { to: '/contact', label: 'Contact Us' },
    ],
  },
]

const Footer = () => {
  return (
    <footer className='mt-28 text-cream'>
      {/* Wavy top edge */}
      <svg viewBox='0 0 1440 60' className='block w-full h-8 sm:h-12' preserveAspectRatio='none' aria-hidden='true'>
        <path d='M0 30 Q 60 0 120 30 T 240 30 T 360 30 T 480 30 T 600 30 T 720 30 T 840 30 T 960 30 T 1080 30 T 1200 30 T 1320 30 T 1440 30 V60 H0Z' fill='#2D1B3D' />
      </svg>

      <div className='bg-ink'>
        <div className='grid gap-10 py-12 page-x sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr]'>
          <div>
            <Link to='/'>
              <Logo light className='text-4xl' />
            </Link>
            <p className='max-w-sm mt-5 text-sm leading-relaxed text-cream/70'>
              Cute, comfy, everyday fashion for men, women and kids. Delivered to your door with
              Cash on Delivery and easy 10-day returns.
            </p>
            <p className='mt-4 text-2xl font-hand text-lemon -rotate-2'>stay cute, stay comfy ✌️</p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className='mb-4 text-lg font-semibold font-display text-bubble'>{column.title}</p>
              <ul className='flex flex-col gap-2.5 text-sm text-cream/80'>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className='transition hover:text-lemon'>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className='mb-4 text-lg font-semibold font-display text-bubble'>Say hi 👋</p>
            <ul className='flex flex-col gap-3 text-sm text-cream/80'>
              <li className='flex items-center gap-2'><Phone size={15} /> +91 98765 43210</li>
              <li className='flex items-center gap-2'><Mail size={15} /> support@trendify.in</li>
              <li className='flex items-center gap-2'><MapPin size={15} /> Bengaluru, India</li>
            </ul>
          </div>
        </div>

        <div className='flex flex-col items-center justify-between gap-2 py-5 text-xs border-t page-x border-cream/15 text-cream/60 sm:flex-row'>
          <p>© {new Date().getFullYear()} Trendify. All rights reserved.</p>
          <p>Made with 💖 using React, Node.js, Express & Supabase</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
