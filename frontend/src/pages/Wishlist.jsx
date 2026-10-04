import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem, { productGrid } from '../components/ProductItem'
import usePageTitle from '../hooks/usePageTitle'

const Wishlist = () => {
  usePageTitle('Wishlist')
  const { products, wishlist, productsLoading } = useContext(ShopContext)
  const savedProducts = products.filter((product) => wishlist.includes(product._id))

  if (productsLoading) return <div className='min-h-[50vh]' />

  return (
    <div className='pt-12'>
      <Title text1='My' text2='wishlist' color='bubble' note='things you ♡' subtitle='Pieces you have saved for later, kept on this device.' />

      {savedProducts.length === 0 ? (
        <div className='flex flex-col items-center gap-4 py-20 text-center'>
          <span className='flex items-center justify-center text-5xl border-2 rounded-full w-28 h-28 bg-bubble-light border-ink shadow-pop animate-float'>💝</span>
          <p className='mt-4 text-3xl font-bold font-display'>No crushes yet</p>
          <p className='text-ink/70'>Tap the heart on anything you love and it'll wait for you here.</p>
          <Link to='/collection' className='btn-primary'>Find something cute</Link>
        </div>
      ) : (
        <div className={productGrid}>
          {savedProducts.map((item) => (
            <ProductItem key={item._id} product={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist
