import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { ShopContext } from '../context/ShopContext'
import { getCategoryStyle } from '../theme'

// Shared Tailwind classes for every product grid on the site
export const productGrid = 'grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'

const ProductItem = ({ product }) => {
  const { _id: id, image, name, price, category, bestSeller } = product
  const { formatINR, isInWishlist, toggleWishlist } = useContext(ShopContext)
  const saved = isInWishlist(id)
  const style = getCategoryStyle(category)

  return (
    <div className='group'>
      {/* Pastel frame tinted by category, lifts on hover */}
      <div className={`relative p-2 border-2 border-ink rounded-3xl shadow-pop transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-pop-lg ${style.tint}`}>
        <Link to={`/product/${id}`} aria-label={name} className='relative block overflow-hidden border-2 border-ink rounded-2xl aspect-[13/15] bg-white'>
          <img
            src={image[0]}
            alt={name}
            loading='lazy'
            className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-105'
          />
          {/* Show the second photo on hover when there is one */}
          {image[1] && (
            <img
              src={image[1]}
              alt=''
              loading='lazy'
              className='absolute inset-0 object-cover w-full h-full transition-opacity duration-500 opacity-0 group-hover:opacity-100'
            />
          )}
        </Link>

        {bestSeller && (
          <span className='absolute -left-2 -top-3 sticker bg-lemon -rotate-6 shadow-pop-sm'>★ Bestseller</span>
        )}

        <button
          onClick={() => toggleWishlist(id)}
          aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute right-4 top-4 icon-btn !w-9 !h-9 ${saved ? '!bg-bubble' : ''}`}
        >
          <Heart key={String(saved)} size={16} className={saved ? 'fill-ink animate-pop' : ''} />
        </button>
      </div>

      <Link to={`/product/${id}`} className='block px-1 mt-4'>
        <p className='text-xs font-bold tracking-wide uppercase text-ink/50'>{style.emoji} {category}</p>
        <p className='mt-1 font-semibold leading-snug line-clamp-1 group-hover:text-bubble-dark'>{name}</p>
        <p className='mt-1 text-lg font-semibold font-display'>{formatINR(price)}</p>
      </Link>
    </div>
  )
}

export default ProductItem
