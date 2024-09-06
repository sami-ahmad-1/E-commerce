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
import AdminProfilePage from './pages/AdminProfilePage';

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
    element: <Protected><UserHomePage /></Protected>
  },
  {
    path: `/productdetail/:id`,
    element: <Protected>< ProductDetailPage /></Protected>
  },
  {
    path: "/admin/homepage",
    element: <ProtectedAdmin> <AdminHomePage /></ProtectedAdmin>
  },
  {
    path: `/admin/productdetail/:id`,
    element: <ProtectedAdmin><AdminProductDetailPage /></ProtectedAdmin>
  },
  {
    path: `/admin/profile`,
    element: <ProtectedAdmin><AdminProfilePage /></ProtectedAdmin>
  },
  {
    path: "/admin/productform",
    element: <ProtectedAdmin>
      <AdminProductFormPage />
    </ProtectedAdmin>
  },
  {
    path: "/admin/adminorderpage",
    element: <ProtectedAdmin>
      <AdminOrdersPage />
    </ProtectedAdmin>
  },
  {
    path: "/admin/adminProductEditForm/:id",
    element: <ProtectedAdmin>
      <AdminProductEditForm />
    </ProtectedAdmin>
  },
  {
    path: "/order",
    element: <Protected>
      <Order />
    </Protected>
  },
  {
    path: "/cartpage",
    element: <Protected>
      <CartPage></CartPage>
    </Protected>
  },
  {
    path: "/Checkoutpage",
    element: <Protected>
      <CheckoutPage></CheckoutPage>
    </Protected>
  },
  {
    path: '/stripe/checkout',
    element: <Protected>
      <StripeCheckout></StripeCheckout>
    </Protected>
  },
  {
    path: "/orderplaced/:id",
    element: <Protected>
      <OrderSuccessPage></OrderSuccessPage>
    </Protected>
  },
  {
    path: "/cardOrderSuccess",
    element: <Protected>
      <CardOrderSuccessPage></CardOrderSuccessPage>
    </Protected>
  },
  {
    path: "/profile",
    element: <Protected>
      <UserProfilePage />
    </Protected>
  },
  {
    path: "/userorder",
    element: <Protected>
      <UserOrderPage></UserOrderPage>
    </Protected>
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
    } else {
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




