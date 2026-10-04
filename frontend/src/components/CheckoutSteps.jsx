import React from 'react'
import { Check } from 'lucide-react'

const STEPS = ['Bag', 'Details', 'Done']

// INFO: Progress indicator for checkout. `current` is the index of the active step.
const CheckoutSteps = ({ current }) => (
  <ol className='flex items-center justify-center gap-2 mb-12 sm:gap-3'>
    {STEPS.map((step, index) => {
      const done = index < current
      const active = index === current
      return (
        <li key={step} className='flex items-center gap-2 sm:gap-3'>
          <span className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-ink font-display font-semibold text-sm ${
            done ? 'bg-mint' : active ? 'bg-bubble shadow-pop-sm' : 'bg-white text-ink/50'
          }`}>
            <span className='flex items-center justify-center w-5 h-5 text-xs bg-white border-2 rounded-full border-ink text-ink'>
              {done ? <Check size={11} strokeWidth={3} /> : index + 1}
            </span>
            {step}
          </span>
          {index < STEPS.length - 1 && <span className='w-6 border-t-2 border-dashed sm:w-12 border-ink' />}
        </li>
      )
    })}
  </ol>
)

export default CheckoutSteps
