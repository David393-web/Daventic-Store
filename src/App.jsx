import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Navbar from './components/Static/Navbar'
import Hero from './pages/Hero/Hero'
import Products from "./pages/Products/products"
import AOS from "aos"
import 'aos/dist/aos.css';
import TopProducts from './pages/TopProducts/TopProducts'
import Banner from './pages/Banner/Banner'
import Subscribe from './pages/Subscribe/Subscribe'
import Testimonials from './pages/Testimonials/Testimonials'
import Footer from './components/Static/Footer'

const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, [])

  return (
    <div className='bg-white dark:bg-gray-900
    dark:text-white duration-200'>
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <Products />
              <TopProducts />
              <Banner />
              <Subscribe />
              <Products />
              <Testimonials />
              <Footer />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App
