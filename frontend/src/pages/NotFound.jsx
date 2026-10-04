import React from 'react'
import { Link } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'

const NotFound = () => {
  usePageTitle('Page not found')

  return (
    <div className='flex flex-col items-center gap-4 py-24 text-center'>
      <span className='text-7xl animate-wiggle'>🙈</span>
      <p className='font-bold text-8xl font-display text-bubble' style={{ WebkitTextStroke: '3px #2D1B3D' }}>404</p>
      <p className='text-3xl font-bold font-display'>Oops, this page wandered off</p>
      <p className='text-ink/70'>The page you're looking for doesn't exist or has moved.</p>
      <div className='flex flex-wrap justify-center gap-4 mt-4'>
        <Link to='/' className='btn-primary'>Take me home</Link>
        <Link to='/collection' className='btn-outline'>Go shopping</Link>
      </div>
    </div>
  )
}

export default NotFound
