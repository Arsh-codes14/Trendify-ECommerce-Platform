import React from 'react'
import { Sparkle } from './Decor'

// INFO: Text wordmark: plum "trendify" with a bubblegum "t" and a lemon sparkle
const Logo = ({ className = 'text-3xl', light = false }) => (
  <span className={`relative inline-block font-display font-bold tracking-tight leading-none ${light ? 'text-cream' : 'text-ink'} ${className}`}>
    <span className='text-bubble'>t</span>rendify
    <Sparkle className='absolute w-[0.45em] h-[0.45em] -top-[0.15em] -right-[0.5em] text-lemon' />
  </span>
)

export default Logo
