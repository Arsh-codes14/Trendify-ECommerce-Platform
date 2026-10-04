import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RequireClerkAuth from './components/RequireClerkAuth.jsx'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import OrderSuccess from './pages/OrderSuccess'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

// Wraps pages that need a signed-in shopper
const Protected = ({ children }) => <RequireClerkAuth>{children}</RequireClerkAuth>

const App = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <ScrollToTop />
      <ToastContainer position='bottom-right' autoClose={2500} hideProgressBar newestOnTop limit={3} />
      <NavBar />

      <main className='flex-1 page-x'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Protected><Profile /></Protected>} />
          <Route path='/place-order' element={<Protected><PlaceOrder /></Protected>} />
          <Route path='/order-success/:orderId' element={<Protected><OrderSuccess /></Protected>} />
          <Route path='/orders' element={<Protected><Orders /></Protected>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
