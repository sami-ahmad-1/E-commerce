import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cartItemsSlice } from './cartSlice'
import { selectLoggedInUser } from '../auth/authSlice'
import { RemoveProductAsync, updateItemAsync } from './cartSlice'
import { discountedPrice } from '../../app/Constants'
import { useNavigate } from 'react-router-dom'
import PleaseLoginCom from '../Loading/PleaseLoginCom'
import Swal from 'sweetalert2'

export default function Cart() {
  const dispatch = useDispatch()
  const cartItems = useSelector(cartItemsSlice)
  const user = useSelector(selectLoggedInUser)

  const handleQuantity = (e, product) => {
    e.preventDefault()
    dispatch(updateItemAsync({ ...product, quantity: +e.target.value }))
  }

  const handleRemove = (e, product) => {
    e.preventDefault()
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(RemoveProductAsync(product))
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

  const navigate = useNavigate();
  const handleCheckout = () => {
    if(cartItems.length != 0){
      navigate("/Checkoutpage")
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your Cart is Empty",
      });
    }
  }

  return (
    <>
      {user ? (
        <div className='px-4 sm:px-6 lg:px-60'>
          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems.map((product) => (
                  <li key={product.id} className="flex py-6 flex-col sm:flex-row">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.thumbnail}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col mt-4 sm:mt-0">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={product.href}>{product.title}</a>
                          </h3>
                          <p className="ml-4">${(discountedPrice(product) * product.quantity).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                      </div>

                      <div className="flex flex-1 items-end justify-between text-sm mt-4 sm:mt-0">
                        <div>
                          <label className="text-gray-500">Qty </label>
                          <select onChange={(e) => handleQuantity(e, product)} value={product.quantity}>
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
          <div className="border-t border-gray-200 py-6 sm:px-6 mt-5">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${cartItems.reduce((acc, obj) => acc + discountedPrice(obj) * obj.quantity, 0).toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total Items</p>
              <p>{cartItems.length}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            {/* <Link to='/Checkoutpage'> */}
              <div className="mt-6 cursor-pointer"  onClick={handleCheckout}> 
                <p
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 lg:w-1/5 w-full"
                >
                  Checkout
                </p>
              </div>
            {/* </Link> */}
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
      ) : (
        <PleaseLoginCom></PleaseLoginCom>        
      )}
    </>
  )
}
