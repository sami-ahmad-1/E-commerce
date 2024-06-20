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
import OrderSuccessPage from './pages/orderSuccessPage';
import Order from './features/order/order';
import PageNotFound from './pages/404';

import UserProfilePage from './pages/UserProfilePage';
import UserOrderPage from './pages/UserOrderPage';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByUserId } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';
import { fetchLoggedInUserAsync } from './features/user/userSlice';

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
    path: "/order",
    element: <Order></Order>
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
    path: "/orderplaced",
    element: <OrderSuccessPage></OrderSuccessPage>
  },
  {
    path: "/profile",
    element: <UserProfilePage/>
  },
  {
    path: "/userorder",
    element: <UserOrderPage></UserOrderPage>
  },
  {
    path: "/",
    element: <Product></Product>
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>
  },
])

function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)
  console.log('Logged in user is  : ' , user)

  useEffect(()=>{
    if(user){
      dispatch(fetchProductByUserId(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  })
  
  return (
    <>      
      <RouterProvider router={router} />
    </>
  )
}

export default App




