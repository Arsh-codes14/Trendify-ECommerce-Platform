import React from 'react'
import { Minus, Plus } from 'lucide-react'

// INFO: "-  2  +" control used on the product page and in the cart
const QuantityStepper = ({ value, onChange, min = 1, max = 10, size = 'md' }) => {
  const box = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'

  return (
    <div className='inline-flex items-center gap-1 p-1 bg-white border-2 rounded-full border-ink'>
      <button
        type='button'
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        className={`${box} flex items-center justify-center rounded-full hover:bg-lemon disabled:opacity-30 disabled:hover:bg-transparent`}
        aria-label='Decrease quantity'
      >
        <Minus size={14} strokeWidth={3} />
      </button>
      <span className='w-7 font-bold text-center font-display' aria-live='polite'>{value}</span>
      <button
        type='button'
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        className={`${box} flex items-center justify-center rounded-full hover:bg-lemon disabled:opacity-30 disabled:hover:bg-transparent`}
        aria-label='Increase quantity'
      >
        <Plus size={14} strokeWidth={3} />
      </button>
    </div>
  )
}

export default QuantityStepper
