import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronRight, Heart } from 'lucide-react'
import { ShopContext, FREE_SHIPPING_THRESHOLD } from '../context/ShopContext'
import { getCategoryStyle } from '../theme'
import RelatedProducts from '../components/RelatedProducts'
import QuantityStepper from '../components/QuantityStepper'
import usePageTitle from '../hooks/usePageTitle'

const Product = () => {
  const { productId } = useParams()
  const { products, productsLoading, addToCart, formatINR, navigate, isInWishlist, toggleWishlist } = useContext(ShopContext)

  const productData = products.find((product) => product._id === productId)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  usePageTitle(productData?.name)

  // Reset the selections when moving to another product
  useEffect(() => {
    setImage(productData?.image[0] || '')
    setSize('')
    setQuantity(1)
  }, [productData])

  if (!productData) {
    if (productsLoading) return <div className='min-h-[60vh]' />
    return (
      <div className='flex flex-col items-center gap-4 py-24 text-center'>
        <p className='text-6xl'>🫥</p>
        <p className='text-3xl font-bold font-display'>Product not found</p>
        <p className='text-ink/70'>This one may have sold out or been removed.</p>
        <Link to='/collection' className='btn-primary'>Browse the shop</Link>
      </div>
    )
  }

  const saved = isInWishlist(productData._id)
  const style = getCategoryStyle(productData.category)

  const buyNow = () => {
    if (addToCart(productData._id, size, quantity)) navigate('/cart')
  }

  const perks = [
    { emoji: '🚚', text: `Free shipping on orders over ${formatINR(FREE_SHIPPING_THRESHOLD)}` },
    { emoji: '💸', text: 'Cash on Delivery available' },
    { emoji: '↺', text: 'Easy returns and exchanges within 10 days' },
  ]

  return (
    <div className='pt-8'>
      {/* Breadcrumb */}
      <nav className='flex flex-wrap items-center gap-1 mb-8 text-sm font-semibold text-ink/60' aria-label='Breadcrumb'>
        <Link to='/' className='hover:text-bubble-dark'>Home</Link>
        <ChevronRight size={14} />
        <Link to='/collection' className='hover:text-bubble-dark'>Shop</Link>
        <ChevronRight size={14} />
        <Link to={`/collection?category=${productData.category}`} className='hover:text-bubble-dark'>{productData.category}</Link>
        <ChevronRight size={14} />
        <span className='truncate text-ink'>{productData.name}</span>
      </nav>

      <div className='grid gap-12 md:grid-cols-2 lg:gap-16'>
        {/* Gallery in a pastel frame */}
        <div className={`self-start p-3 border-2 border-ink rounded-[2rem] shadow-pop-lg ${style.tint}`}>
          <div className='overflow-hidden bg-white border-2 border-ink rounded-3xl aspect-[13/15]'>
            <img src={image} alt={productData.name} className='object-cover w-full h-full' />
          </div>
          {productData.image.length > 1 && (
            <div className='flex gap-3 mt-3 overflow-x-auto no-scrollbar'>
              {productData.image.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setImage(item)}
                  className={`w-20 shrink-0 overflow-hidden rounded-2xl bg-white aspect-[13/15] border-2 border-ink transition ${image === item ? 'shadow-pop-sm -translate-y-0.5' : 'opacity-60 hover:opacity-100'}`}
                  aria-label={`Show photo ${index + 1}`}
                >
                  <img src={item} alt='' className='object-cover w-full h-full' />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <span className={`sticker ${style.solid} -rotate-2`}>{style.emoji} {productData.category} · {productData.subCategory}</span>
          <h1 className='mt-5 text-4xl font-bold leading-tight'>{productData.name}</h1>
          <div className='flex items-baseline gap-3 mt-4'>
            <p className='text-3xl font-bold font-display'>{formatINR(productData.price)}</p>
            <p className='text-sm text-ink/60'>incl. all taxes</p>
          </div>

          <p className='mt-6 leading-relaxed text-ink/75'>{productData.description}</p>

          {/* Size */}
          <div className='mt-8'>
            <div className='flex items-center justify-between mb-3'>
              <p className='font-bold font-display'>Pick your size</p>
              {size && <p className='text-xl font-hand text-bubble-dark'>great choice! ✓</p>}
            </div>
            <div className='flex flex-wrap gap-3'>
              {productData.sizes.map((item) => (
                <button
                  key={item}
                  onClick={() => setSize(item)}
                  className={`min-w-12 h-12 px-4 rounded-full border-2 border-ink font-display font-bold transition-all ${
                    item === size ? 'bg-bubble shadow-pop-sm -translate-y-0.5' : 'bg-white hover:bg-lemon-light'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + actions */}
          <div className='mt-8'>
            <p className='mb-3 font-bold font-display'>Quantity</p>
            <QuantityStepper value={quantity} onChange={setQuantity} />
          </div>

          <div className='flex gap-3 mt-8'>
            <button onClick={() => addToCart(productData._id, size, quantity)} className='flex-1 btn-primary'>
              Add to bag 🛍️
            </button>
            <button
              onClick={() => toggleWishlist(productData._id)}
              className={`icon-btn !w-[52px] !h-[52px] shrink-0 shadow-pop ${saved ? '!bg-bubble' : ''}`}
              aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <Heart key={String(saved)} size={20} className={saved ? 'fill-ink animate-pop' : ''} />
            </button>
          </div>
          <button onClick={buyNow} className='w-full mt-4 btn-outline'>Buy it now ⚡</button>

          <ul className='flex flex-col gap-3 p-5 mt-8 border-2 border-ink rounded-3xl bg-mint-light'>
            {perks.map(({ emoji, text }) => (
              <li key={text} className='flex items-center gap-3 text-sm font-semibold'>
                <span className='flex items-center justify-center bg-white border-2 rounded-full w-9 h-9 shrink-0 border-ink'>{emoji}</span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Info tabs */}
      <div className='mt-16'>
        <div className='flex gap-2'>
          {[
            { id: 'description', label: 'Details' },
            { id: 'shipping', label: 'Shipping & Returns' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full border-2 border-ink font-display font-semibold text-sm transition ${activeTab === tab.id ? 'bg-ink text-cream' : 'bg-white hover:bg-lemon-light'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className='max-w-3xl p-6 mt-4 leading-relaxed bg-white border-2 border-ink rounded-3xl'>
          {activeTab === 'description' ? (
            <div className='flex flex-col gap-4'>
              <p className='text-ink/80'>{productData.description}</p>
              <dl className='grid grid-cols-[110px_1fr] gap-y-2 text-sm'>
                <dt className='font-bold text-ink/50'>Category</dt><dd className='font-semibold'>{productData.category}</dd>
                <dt className='font-bold text-ink/50'>Type</dt><dd className='font-semibold'>{productData.subCategory}</dd>
                <dt className='font-bold text-ink/50'>Sizes</dt><dd className='font-semibold'>{productData.sizes.join(', ')}</dd>
              </dl>
            </div>
          ) : (
            <ul className='flex flex-col gap-2 text-sm font-semibold text-ink/80'>
              <li>🚚 Standard delivery in 4-7 business days across India.</li>
              <li>🎁 Free shipping on orders over {formatINR(FREE_SHIPPING_THRESHOLD)}; otherwise a flat ₹99.</li>
              <li>💸 Pay with Cash on Delivery when your order arrives.</li>
              <li>↺ Returns and exchanges accepted within 10 days of delivery.</li>
            </ul>
          )}
        </div>
      </div>

      <RelatedProducts productId={productData._id} category={productData.category} subCategory={productData.subCategory} />
    </div>
  )
}

export default Product
