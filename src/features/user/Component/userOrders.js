import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser } from '../../auth/authSlice';
import { fetchuserOrdersAsync, selectUserOrders } from '../userSlice';
import PleaseLoginCom from '../../Loading/PleaseLoginCom';

export default function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    if (user) {
      dispatch(fetchuserOrdersAsync());
    }
  }, [dispatch, user]);

  if (!orders) {
    return (
      (
        <div className="flex items-center justify-center h-screen">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
            </div>
          </div>
        </div>
      )
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {orders.map((order, index) => (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6" key={index}>
          <h1 className="text-xl font-semibold mb-4 border-b pb-2">
            Order Id # {order.id}
          </h1>
          <ul className="space-y-6">
            {order.cartItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-24 w-24 overflow-hidden rounded-md border">
                    <img
                      src={item.product.thumbnail}
                      alt={item.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">
                      <a href={item.href}>{item.product.title}</a>
                    </h3>
                    <p className="text-sm text-gray-500">{item.color}</p>
                    <p className="mt-1 text-sm">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-medium text-gray-900">
                  ${item.product.price * item.quantity}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <div className="flex justify-between border-t pt-4">
              <p className="font-medium text-gray-700">Subtotal</p>
              <p className="font-medium text-gray-900">${order.totalPrice}</p>
            </div>
            <div className="flex justify-between border-t pt-4">
              <p className="font-medium text-gray-700">Total Items</p>
              <p className="font-medium text-gray-900">{order.totalItems}</p>
            </div>
            <div className="flex justify-between border-t pt-4">
              <p className="font-medium text-gray-700">Payment Method</p>
              <p className="font-medium text-gray-900">{order.paymentMethod}</p>
            </div>
            <div className="flex justify-between border-t pt-4">
              <p className="font-medium text-gray-700">Order Status</p>
              <p className="font-medium text-gray-900">{order.status}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
