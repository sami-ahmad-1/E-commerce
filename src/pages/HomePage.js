import React from 'react'
import Navbar from '../features/navbar/navbar'
import ProductList from '../features/product/Component/productsList'
import Footer from '../features/Footer/Footer'

function Home() {
  return (
    <>
      <Navbar />
      <ProductList />
      <Footer/>
    </>
  )
}

export default Home