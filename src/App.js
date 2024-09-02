import React from 'react';
import HomePage from './pages/HomePage'
import Login from './features/auth/components/login';
import Logout from './features/auth/components/Logout';
import SignUp from './features/auth/components/signup';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetail from '../src/features/product/Component/productDetail'
import OrderSuccessPage from './pages/OrderSuccessPage';
import CardOrderSuccessPage from './pages/CardOrderSuccessPage';
import Order from './features/order/order';
import PageNotFound from './pages/404';
import Protected from './features/auth/components/Protected';

import AdminHomePage from './pages/AdminHomePage'
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import AdminProductEditForm from '../src/features/admin/Component/AdminProductEditForm'
import ProtectedAdmin from './features/auth/components/ProtectedAdmin'

import UserHomePage from './pages/UserHomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import UserProfilePage from './pages/UserProfilePage';
import UserOrderPage from './pages/UserOrderPage';
import StripeCheckout from './pages/StripeCheckout';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByUserId } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import { fetchProductDetail } from './features/product/productsSlice'

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
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
  {
    path: "/",
    element: <><UserHomePage /></>
  },
  {
    path: `/productdetail/:id`,
    element: < ProductDetailPage/>
  },
  {
    path: "/admin/homepage",
    element: <ProtectedAdmin> <AdminHomePage /></ProtectedAdmin>
  },
  {
    path: `/admin/productdetail/:id`,
    element: <AdminProductDetailPage/>
  },
  {
    path: "/admin/productform",
    element: <AdminProductFormPage />
  },
  {
    path: "/admin/adminorderpage",
    element: <AdminOrdersPage />
  },
  {
    path: "/admin/adminProductEditForm/:id",
    element: <AdminProductEditForm />
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
    path: "/Checkoutpage",
    element: <CheckoutPage></CheckoutPage>
  },
  {
    path: '/stripe/checkout',
    element: <StripeCheckout></StripeCheckout>
  },
  {
    path: "/orderplaced/:id",
    element: <OrderSuccessPage></OrderSuccessPage>
  },
  {
    path: "/cardOrderSuccess",
    element: <CardOrderSuccessPage></CardOrderSuccessPage>
  },
  {
    path: "/profile",
    element: <UserProfilePage />
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

  useEffect(() => {
    if (user) {
      dispatch(fetchLoggedInUserAsync())      
      dispatch(fetchProductByUserId())     
      dispatch(fetchProductDetail('66c44a23c282608e91981e9b'))     
    }else{      
      dispatch(fetchProductDetail('66c44a23c282608e91981e9b'))          
    }
  })

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App




