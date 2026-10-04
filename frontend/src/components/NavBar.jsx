import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { Heart, Menu, Package, Search, ShoppingBag, User, X } from 'lucide-react'
import { ShopContext, FREE_SHIPPING_THRESHOLD } from '../context/ShopContext'
import SearchBar from './SearchBar'
import Logo from './Logo'

const links = [
  { to: '/', label: 'Home', emoji: '🏠' },
  { to: '/collection', label: 'Shop', emoji: '🛍️' },
  { to: '/about', label: 'About', emoji: '💫' },
  { to: '/contact', label: 'Contact', emoji: '💌' },
]

// Number bubble on the bag / wishlist icons. `key` re-mounts it so it "pops" on change.
const CountBadge = ({ count }) =>
  count > 0 ? (
    <span key={count} className='absolute -right-1.5 -top-1.5 min-w-[20px] h-5 px-1 rounded-full bg-bubble border-2 border-ink text-[10px] font-extrabold flex items-center justify-center animate-pop'>
      {count}
    </span>
  ) : null

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { showSearch, setShowSearch, getCartCount, wishlist, formatINR } = useContext(ShopContext)
  const location = useLocation()

  // Close the mobile menu (and search, outside the shop) whenever the page changes
  useEffect(() => {
    setMenuOpen(false)
    if (location.pathname !== '/collection') setShowSearch(false)
  }, [location.pathname, setShowSearch])

  const tickerItems = [
    `Free shipping over ${formatINR(FREE_SHIPPING_THRESHOLD)}`,
    'Cash on Delivery',
    '10-day easy returns',
    'Secure checkout',
    'Made for every day',
  ]

  return (
    <>
      {/* Scrolling candy ticker (rendered twice for a seamless loop) */}
      <div className='overflow-hidden border-b-2 bg-lemon border-ink' aria-label='Store perks'>
        <div className='flex w-max animate-marquee'>
          {[0, 1].map((copy) => (
            <ul key={copy} className='flex shrink-0' aria-hidden={copy === 1}>
              {tickerItems.map((item) => (
                <li key={item} className='flex items-center gap-3 px-6 py-2 text-xs font-extrabold tracking-wider uppercase whitespace-nowrap'>
                  <span className='text-bubble-dark'>✦</span> {item}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <header className='sticky top-0 z-40 border-b-2 border-ink bg-cream/90 backdrop-blur-md'>
        <nav className='flex items-center justify-between h-16 page-x sm:h-20'>
          <Link to='/' aria-label='Trendify home'>
            <Logo className='text-2xl sm:text-3xl' />
          </Link>

          {/* Desktop links */}
          <ul className='hidden gap-2 md:flex'>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full border-2 font-display font-semibold transition ${
                      isActive ? 'bg-bubble-light border-ink' : 'border-transparent hover:border-ink hover:bg-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Icons */}
          <div className='flex items-center gap-2'>
            <button onClick={() => setShowSearch(!showSearch)} className='icon-btn' aria-label='Search products'>
              {showSearch ? <X size={18} /> : <Search size={18} />}
            </button>

            <Link to='/wishlist' className='hidden icon-btn sm:flex' aria-label='Wishlist'>
              <Heart size={18} />
              <CountBadge count={wishlist.length} />
            </Link>

            <Link to='/cart' className='icon-btn' aria-label='Shopping bag'>
              <ShoppingBag size={18} />
              <CountBadge count={getCartCount()} />
            </Link>

            <SignedIn>
              <div className='flex items-center p-0.5 ml-1 border-2 rounded-full border-ink bg-white'>
                <UserButton userProfileMode='navigation' userProfileUrl='/profile'>
                  <UserButton.MenuItems>
                    <UserButton.Link label='My Orders' labelIcon={<Package size={14} />} href='/orders' />
                    <UserButton.Link label='Wishlist' labelIcon={<Heart size={14} />} href='/wishlist' />
                  </UserButton.MenuItems>
                </UserButton>
              </div>
            </SignedIn>
            <SignedOut>
              <Link to='/login' className='hidden ml-1 sm:inline-flex btn-primary !px-5 !py-2 text-sm'>
                Sign in
              </Link>
              <Link to='/login' className='icon-btn sm:hidden' aria-label='Sign in'>
                <User size={18} />
              </Link>
            </SignedOut>

            <button onClick={() => setMenuOpen(true)} className='icon-btn md:hidden' aria-label='Open menu'>
              <Menu size={18} />
            </button>
          </div>
        </nav>

        <SearchBar />
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-50 md:hidden ${menuOpen ? 'visible' : 'invisible'}`}>
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-ink/40 transition-opacity ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
        />
        <aside className={`absolute top-0 right-0 flex flex-col h-full w-72 bg-cream border-l-2 border-ink transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className='flex items-center justify-between p-5 border-b-2 border-ink'>
            <Logo className='text-2xl' />
            <button onClick={() => setMenuOpen(false)} className='icon-btn' aria-label='Close menu'>
              <X size={18} />
            </button>
          </div>
          <div className='flex flex-col gap-2 p-4'>
            {[...links, { to: '/wishlist', label: 'Wishlist', emoji: '💖' }, { to: '/orders', label: 'My Orders', emoji: '📦' }].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-2xl border-2 border-ink font-display font-semibold text-lg ${isActive ? 'bg-bubble shadow-pop-sm' : 'bg-white'}`
                }
              >
                <span>{link.emoji}</span> {link.label}
              </NavLink>
            ))}
          </div>
        </aside>
      </div>
    </>
  )
}

export default NavBar
