import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ShopContext } from '../context/ShopContext'
import { categoryStyles } from '../theme'
import Title from './Title'

// INFO: One candy-coloured tile per category, using a real product photo from it
const CategoryTiles = () => {
  const { products } = useContext(ShopContext)

  if (products.length === 0) return null

  return (
    <section className='py-14'>
      <Title text1='Shop by' text2='vibe' color='bubble' note='pick your fave ♡' />
      <div className='grid gap-6 sm:grid-cols-3'>
        {Object.entries(categoryStyles).map(([category, style], index) => {
          const items = products.filter((product) => product.category === category)
          if (items.length === 0) return null
          // Topwear photos show the model best
          const cover = items.find((product) => product.subCategory === 'Topwear') || items[0]

          return (
            <Link
              key={category}
              to={`/collection?category=${category}`}
              className={`group relative flex items-center gap-4 p-4 sm:flex-col sm:items-start border-2 border-ink rounded-3xl shadow-pop transition-all duration-300 hover:shadow-pop-lg hover:-translate-y-1 ${
                index % 2 ? 'hover:rotate-1' : 'hover:-rotate-1'
              } ${style.solid}`}
            >
              <div className='w-24 overflow-hidden bg-white border-2 shrink-0 sm:w-full border-ink rounded-2xl aspect-square'>
                <img
                  src={cover.image[0]}
                  alt={`${category} collection`}
                  loading='lazy'
                  className='object-cover object-top w-full h-full transition-transform duration-500 group-hover:scale-105'
                />
              </div>
              <div className='flex-1 w-full'>
                <div className='flex items-center justify-between'>
                  <p className='text-2xl font-bold font-display sm:text-3xl'>{category}</p>
                  <span className='text-3xl transition-transform group-hover:animate-wiggle'>{style.emoji}</span>
                </div>
                <p className='flex items-center gap-1 mt-1 text-sm font-bold'>
                  {items.length} styles <ArrowRight size={15} className='transition-transform group-hover:translate-x-1' />
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default CategoryTiles
