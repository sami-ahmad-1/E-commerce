import React from 'react';
import Home from './pages/Home'
import Login from './features/auth/components/login';
import SignUp from './features/auth/components/signup';
import Navbar from '../src/features/navbar/navbar'
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Product from '../src/features/product/Component/productsList'
import ProductDetail from '../src/features/product/Component/productDetail'

function App() {
  return (
    <>
    <Navbar/>
    <Product/>
    </>
  )
}

export default App

