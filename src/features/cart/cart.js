import Navbar from '../navbar/navbar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cartItemsSlice } from './cartSlice'
import { RemoveProductAsync, updateItemAsync } from './cartSlice'


export default function Cart() {
  const dispatch = useDispatch()
  const cartItems = useSelector(cartItemsSlice)
    
  const totalPrice = cartItems.reduce((acc, obj) => { return acc + obj.price * obj.quantity }, 0)
  const totalItems = cartItems.reduce((acc, obj) => { return acc + obj.quantity }, 0)

  const handleQuantity = (e, product) => {
    e.preventDefault()
    console.log('First', e.target.value, product)
    console.log('CartItem are', { ...product, quantity: +e.target.value })
    dispatch(updateItemAsync({ ...product, quantity: +e.target.value }))
  }

  const handleRemove = (e, product) => {
    e.preventDefault()
    dispatch(RemoveProductAsync(product))
  }
  return (
    <>
      <Navbar />
      {cartItems.length >= 1 ?
        <div className='px-60'>

          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.thumbnail}
                        // alt={product.imageAlt}
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
                        <div>
                          <label className="text-gray-500">Qty </label>
                          <select onClick={(e) => handleQuantity(e, product)} >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={(e) => handleRemove(e, product)}
                          >
                            Remove
                          </button>
                        </div>
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
              <p >₹{totalPrice}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total Items</p>
              <p >{totalItems}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <Link to='/checkout'>
              <div className="mt-6">
                <p
                  href="#"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 lg:w-[20%] "
                >
                  Checkout
                </p>
              </div>
            </Link>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{' '}
                <Link to='/'>
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>

        </div>

        : <div>
          <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">              
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Your Cart is Empty </h1>              
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link to='/'>
                <div                  
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Go back home
                </div>
                </Link>
                {/* <a href="#" className="text-sm font-semibold text-gray-900">
                  Contact support <span aria-hidden="true">&rarr;</span>
                </a> */}
              </div>
            </div>
          </main>
        </div>
      }
    </>
  )
}






