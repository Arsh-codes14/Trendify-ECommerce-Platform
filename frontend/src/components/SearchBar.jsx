import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { ShopContext } from '../context/ShopContext'

// INFO: Search panel under the header. Typing from any page jumps to the shop,
// where the product grid filters live.
const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
  const location = useLocation()
  const navigate = useNavigate()

  if (!showSearch) return null

  const onChange = (e) => {
    setSearch(e.target.value)
    if (location.pathname !== '/collection') navigate('/collection')
  }

  const close = () => {
    setSearch('')
    setShowSearch(false)
  }

  return (
    <div className='py-4 border-t-2 border-ink page-x bg-lilac-light'>
      <div className='relative max-w-2xl mx-auto'>
        <Search size={18} className='absolute -translate-y-1/2 left-4 top-1/2' />
        <input
          autoFocus
          value={search}
          onChange={onChange}
          onKeyDown={(e) => e.key === 'Escape' && close()}
          className='w-full py-3 font-semibold bg-white border-2 rounded-full outline-none pl-11 pr-11 border-ink shadow-pop placeholder:text-ink/40 focus:ring-4 focus:ring-bubble/40'
          type='text'
          placeholder='Search for jackets, tops, trousers...'
          aria-label='Search products'
        />
        {search && (
          <button onClick={close} className='absolute p-1 -translate-y-1/2 rounded-full right-3 top-1/2 hover:bg-lemon' aria-label='Clear search'>
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar
