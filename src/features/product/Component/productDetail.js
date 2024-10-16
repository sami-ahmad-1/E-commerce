import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductDetail } from '../productsSlice'
import { selectProductDetail } from '../productsSlice'
import { AddToCart } from '../../cart/cartSlice'
import { selectLoggedInUser } from '../../auth/authSlice'
import { ProductListDiscountedPrice } from '../../../app/Constants'
// import { discountedPrice } from '../../../app/Constants'

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

  const arr = []
  arr.push(prod)
  const user = useSelector(selectLoggedInUser)

  const handleClick = (e) => {
    if(user != null){  
      const newItem = { ...prod, quantity: 1, userId: user.id }
      delete newItem['id']
      // dispatch(AddToCart(newItem))
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Login to Add Product to Cart",
      });
    }
    e.preventDefault();

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
            <div className="pt-6 ">
              <div className=" ] mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 max-sm:hidden  " >              
                    {prod.images && prod.images.map((val, index) =>
                      <div key={index} className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                        <img
                          src={val}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>)}                                
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
                  <p className="text-3xl tracking-tight text-gray-900"> ${ProductListDiscountedPrice(prod)}</p>

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
                    </div>
                  </div>
                  <form className="mt-10">
                    {/* Colors */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Color</h3>
                      <>
                        {/* <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                          <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                          <div className="flex items-center space-x-3">
                            {product.colors.map((color) => (
                              <RadioGroup.Option
                                key={color.name}
                                value={color}
                                className={({ active, checked }) =>
                                  classNames(
                                    color.selectedClass,
                                    active && checked ? 'ring ring-offset-1' : '',
                                    !active && checked ? 'ring-2' : '',
                                    'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                  )
                                }
                              >
                                <RadioGroup.Label as="span" className="sr-only">
                                  {color.name}
                                </RadioGroup.Label>
                                <span
                                  aria-hidden="true"
                                  className={classNames(
                                    color.class,
                                    'h-8 w-8 rounded-full border border-black border-opacity-10'
                                  )}
                                />
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup> */}
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
                        {/* <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                          <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                          <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                            {product.sizes.map((size) => (
                              <RadioGroup.Option
                                key={size.name}
                                value={size}
                                disabled={!size.inStock}
                                className={({ active }) =>
                                  classNames(
                                    size.inStock
                                      ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                      : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                    active ? 'ring-2 ring-indigo-500' : '',
                                    'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                  )
                                }
                              >
                                {({ active, checked }) => (
                                  <>
                                    <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                    {size.inStock ? (
                                      <span
                                        className={classNames(
                                          active ? 'border' : 'border-2',
                                          checked ? 'border-indigo-500' : 'border-transparent',
                                          'pointer-events-none absolute -inset-px rounded-md'
                                        )}
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                      >
                                        <svg
                                          className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                          viewBox="0 0 100 100"
                                          preserveAspectRatio="none"
                                          stroke="currentColor"
                                        >
                                          <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                        </svg>
                                      </span>
                                    )}
                                  </>
                                )}
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup> */}
                      </>
                    </div>

                    <button
                      type="submit"
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      // onClick={handleClick}
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
                      <p className="text-base text-gray-900">{prod.description}</p>
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



