import React from 'react'
import Hero from '../components/Hero'
import CategoryTiles from '../components/CategoryTiles'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import usePageTitle from '../hooks/usePageTitle'

const Home = () => {
  usePageTitle()

  return (
    <div>
      <Hero />
      <OurPolicy />
      <CategoryTiles />
      <LatestCollection />
      <BestSeller />
      <NewsLetterBox />
    </div>
  )
}

export default Home
