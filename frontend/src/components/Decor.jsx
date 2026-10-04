import React from 'react'

// INFO: Small decorative SVGs used around the site

// Four-point sparkle ✦ (fill colour comes from the text colour class)
export const Sparkle = ({ className = '' }) => (
  <svg viewBox='0 0 24 24' className={className} aria-hidden='true'>
    <path
      d='M12 1c.9 5.6 4.4 9.1 10 10-5.6.9-9.1 4.4-10 10-.9-5.6-4.4-9.1-10-10C7.6 10.1 11.1 6.6 12 1Z'
      fill='currentColor'
      stroke='#2D1B3D'
      strokeWidth='1.5'
      strokeLinejoin='round'
    />
  </svg>
)

// Wavy line, used under headings and as dividers
export const Squiggle = ({ className = '' }) => (
  <svg viewBox='0 0 120 12' className={className} preserveAspectRatio='none' aria-hidden='true'>
    <path
      d='M2 6c5-5 10-5 15 0s10 5 15 0 10-5 15 0 10 5 15 0 10-5 15 0 10 5 15 0 10-5 15 0 10 5 11 0'
      fill='none'
      stroke='currentColor'
      strokeWidth='3.5'
      strokeLinecap='round'
    />
  </svg>
)
