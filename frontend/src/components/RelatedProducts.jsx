import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem, { productGrid } from './ProductItem'

const RelatedProducts = ({ productId, category, subCategory }) => {
  const { products } = useContext(ShopContext)

  const related = products
    .filter((item) => item._id !== productId)
    .filter((item) => item.category === category && item.subCategory === subCategory)
    .slice(0, 5)

  if (related.length === 0) return null

  return (
    <section className='mt-20'>
      <Title text1='You might' text2='also love' color='peach' note='matchy-matchy?' />
      <div className={productGrid}>
        {related.map((item) => (
          <ProductItem key={item._id} product={item} />
        ))}
      </div>
    </section>
  )
}

export default RelatedProducts
