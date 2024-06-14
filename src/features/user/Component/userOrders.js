import React, { Profiler, useEffect } from 'react'
import { selectLoggedInUser } from '../../auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { fetchuserOrdersAsync, selectUserInfo } from '../userSlice'

export default function UserProfile() {
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)
  const orders = useSelector(selectUserInfo)  

  useEffect(() => {
    dispatch(fetchuserOrdersAsync(user.id))
  }, [])

  return (
    <div className='bg-slate-100'>      
      {orders && (
        <div>
          {orders.map((prod, index) => (
            <div className='px-60 ' key={index}>            
              <div className="mt-8 bg-slate-200 px-10 py-10">
                <u><h1 className='text-2xl mb-4'>Order Id # {prod.id}</h1></u>
                <div className="flow-root ">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {prod.cartItems.map((product) => (
                      <li key={product.id} className="flex py-6 ">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 ">
                          <img
                            src={product.thumbnail}
                            alt={product.imageAlt}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={product.href}>{product.title}</a>
                              </h3>
                              <p className="ml-4">₹{product.price * product.quantity}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                          </div>

                          <div className="flex flex-1 items-end justify-between text-sm">
                            Quiantity : {product.quantity}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-200   py-6 sm:px-6 mt-5">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>₹{prod.totalPrice}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total Items</p>
                  <p >{prod.totalItems}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Payment Method</p>
                  <p >{prod.paymentMethod}</p>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                </div>
              </div>
            </div>
          ))}
        </div>

      )}
    </div>
  )
}



