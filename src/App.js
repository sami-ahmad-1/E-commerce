import React from 'react';
import Home from './pages/Home'
import Login from './features/auth/components/login';
import SignUp from './features/auth/components/signup';
import Navbar from '../src/features/navbar/navbar'
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Product from '../src/features/product/Component/productsList'
import ProductDetail from '../src/features/product/Component/productDetail'
import productsAPI from './features/product/productsAPI';
import Protected from './features/auth/components/Protected';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByUserId } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';

import * as ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Routes,
  Router
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
  {
    path: "/checkout",
    element: <Checkout></Checkout>
  },
  {
    path: `/productdetail/:id`,
    element: <ProductDetail></ProductDetail>
  },
  {
    path: "/cartpage",
    element: <CartPage></CartPage>
  },
  {
    path: "/",
    element: <Product></Product>
  },
])

function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)
  console.log('Logged in user is  : ' , user)

  useEffect(()=>{
    if(user){
      dispatch(fetchProductByUserId(user.id))
    }
  })
  
  return (
    <>
      {/* <Navbar /> */}
      <RouterProvider router={router} />
    </>
  )
}

export default App




