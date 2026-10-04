import React from 'react'

// Highlighter colours for the second word
const markers = {
  lemon: 'bg-lemon',
  bubble: 'bg-bubble',
  mint: 'bg-mint',
  sky: 'bg-sky',
  lilac: 'bg-lilac',
  peach: 'bg-peach',
}

// INFO: Section heading, e.g. <Title text1='Fresh' text2='Drops' color='mint' note='just landed!' />
// The second word gets a highlighter swash; `note` is a handwritten aside.
const Title = ({ text1, text2, subtitle, note, color = 'lemon', align = 'left' }) => {
  const centered = align === 'center'

  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
      {note && <p className='mb-3 text-2xl leading-none font-hand text-bubble-dark -rotate-2'>{note}</p>}
      <h2 className='text-3xl font-bold sm:text-4xl'>
        {text1}{' '}
        <span className='relative inline-block'>
          <span className={`absolute inset-x-[-4px] bottom-1 h-3 sm:h-4 rounded-full -rotate-1 ${markers[color]}`} />
          <span className='relative'>{text2}</span>
        </span>
      </h2>
      {subtitle && (
        <p className={`mt-3 text-ink/70 sm:text-lg ${centered ? 'max-w-xl mx-auto' : 'max-w-xl'}`}>{subtitle}</p>
      )}
    </div>
  )
}

export default Title
