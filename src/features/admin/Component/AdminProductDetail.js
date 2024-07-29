import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductDetail } from '../../product/productsSlice'
import { selectProductDetail } from '../../product/productsSlice'
import { AddToCart } from '../../cart/cartSlice'
import { selectLoggedInUser } from '../../auth/authSlice'
import { discountedPrice } from '../../../app/Constants'
import { cartItemsSlice } from '../../cart/cartSlice'

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import Swal from 'sweetalert2'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetail() {
  const params = useParams()
  const dispatch = useDispatch()

  const prod = useSelector(selectProductDetail)

  console.log('Product' , prod)
  const user = useSelector(selectLoggedInUser)
  console.log('Logged in User :',user)
  const cartItems = useSelector(cartItemsSlice)
  console.log('Cart Items are : ',cartItems)  
  
  const handleClick = (e) => {
    e.preventDefault()
    if (user != null) {
      const newItem = { ...prod, quantity: 1, userId: user.id }
      delete newItem['id']
      console.log('newItem',newItem)
      const newCartList = [cartItems , newItem]
      console.log(newCartList)
      dispatch(AddToCart(newItem))
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Login to Add Product to Cart",
      });
    }    
  }

  const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000'
  }

  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '400px'
  }


  useEffect(() => {
    dispatch(fetchProductDetail(params.id))
  }, [dispatch, params.id])

  return (
    <>
      {prod &&
        <div >
          <div>
            <div className="pt-6">
              <div className=" ] mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 max-sm:hidden  " >
                {prod.images && prod.images.map((val, index) =>( 
                  <div key={index} className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                    <img
                      src={val}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>))}
              </div>
              <div className="slide-container lg:hidden">
                <Slide>
                  {prod.images && prod.images.map((slideImage, index) => (
                    <div key={index}>
                      <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage})` }}>
                      </div>
                    </div>
                  ))}
                </Slide>
              </div>

              <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16" >
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{prod.title}</h1>
                </div>

                {/* Options */}
                <div className="mt-4 lg:row-span-3 lg:mt-0">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl tracking-tight text-gray-900"> ${discountedPrice(prod)}</p>

                  {/* Reviews */}
                  <div className="mt-6">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              `${prod.rating}` > rating ? 'text-yellow-500' : 'text-gray-200',
                              'h-5 w-5 flex-shrink-0'
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className='text-xl px-4'> {prod.rating}</p>
                    </div>
                  </div>
                  <form className="mt-10">
                    {/* Colors */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Color</h3>
                      <>
                        {/* Lorem. */}
                      </>
                    </div>

                    {/* Sizes */}
                    <div className="mt-10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">Size</h3>
                        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                          Size guide
                        </a>
                      </div>
                      <>
                        {/* Lorem, ipsum. */}
                      </>
                    </div>

                    <button
                      type="submit"
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={ (e) => handleClick(e)}
                    >
                      Add to bag
                    </button>
                  </form>
                </div>

                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                  {/* Description and details */}
                  <div>
                    <h3 className="sr-only">Description</h3>
                    <div className="space-y-6">
                      <p className="text-xl text-gray-900">{prod.description}</p>
                      <p className='text-xl'><strong>Brand</strong> : {prod.brand}</p>
                      <p className='text-xl'><strong>Warranty Information</strong> : {prod.warrantyInformation}</p>
                      <p className='text-xl'><strong>Shipping Information</strong> : {prod.shippingInformation}</p>
                      <p className='text-xl'><strong>Availability Status </strong> : {prod.availabilityStatus}</p>
                      <p className='text-xl'><strong> Return Policy </strong> : {prod.returnPolicy}</p>
                    </div>
                    <div className="mt-5">
                      {prod.reviewa && prod.reviews.map((data, index) => (
                        <div key={index} className="border-2 border-gray-300 rounded-lg p-4 mb-3 shadow-sm">
                          <div className="flex items-center mb-2 justify-between">
                            <div className='flex '>
                              {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                  key={rating}
                                  className={classNames(
                                    data.rating > rating ? 'text-yellow-500' : 'text-gray-200',
                                    'h-5 w-5 flex-shrink-0'
                                  )}
                                  aria-hidden="true"
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-gray-500 text-sm"><strong>{data.date.slice(0, 10)}</strong></span>
                          </div>
                          <p className="text-gray-700 mb-2">{data.comment}</p>
                          <div className="border-t border-gray-200 pt-2">
                            <p className="text-gray-800 font-semibold">{data.reviewerName}</p>
                            <p className="text-gray-500 text-sm">{data.reviewerEmail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

