import React from 'react';
import HomePage from './pages/HomePage'
import Login from './features/auth/components/login';
import SignUp from './features/auth/components/signup';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetail from '../src/features/product/Component/productDetail'
import OrderSuccessPage from './pages/orderSuccessPage';
import Order from './features/order/order';
import PageNotFound from './pages/404';
import Protected from './features/auth/components/Protected';

import AdminHomePage from './pages/AdminHomePage'
import AdminProductDetailPage from './pages/AdminProductDetailPage'
import AdminProductFormPage from './pages/AdminProductFormPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin'

import UserProfilePage from './pages/UserProfilePage';
import UserOrderPage from './pages/UserOrderPage';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByUserId } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';
import { fetchLoggedInUserAsync } from './features/user/userSlice';

import {
  createBrowserRouter,
  RouterProvider,
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
    path: "/",
    element:<><AdminHomePage/></>
  },
  {
    path: `/productdetail/:id`,
    element: <ProductDetail/>
  },
  {
    path: "/admin/homepage",
    element:<ProtectedAdmin> <AdminHomePage/></ProtectedAdmin>
  },
  {
    path: "/admin/productform",
    element:<AdminProductFormPage/>
  },
  {
    path: `/admin/productdetail/:id`,
    element: <ProductDetail></ProductDetail>
  },
  {
    path: "/order",
    element: <Order></Order>
  },
  {
    path: "/cartpage",
    element: <CartPage></CartPage>
  },
  {
    path: "/checkout",
    element: <Checkout></Checkout>
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




