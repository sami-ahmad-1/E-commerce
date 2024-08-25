import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveProductAsync, updateItemAsync, cartItemsSlice } from '../cart/cartSlice'
import { useForm } from 'react-hook-form'
import { selectLoggedInUser, userAddress } from '../auth/authSlice'
import { updateUserInfoAsync } from '../user/userSlice'
import { selectUserInfo } from '../user/userSlice'
import { createOrderAsync } from '../order/orderSlice'
import { discountedPrice } from '../../app/Constants'
import Swal from 'sweetalert2'


function Checkout() {
    const dispatch = useDispatch()
    const cartItems = useSelector(cartItemsSlice)
    // const user = useSelector(selectLoggedInUser)
    const user = useSelector(selectUserInfo)
    const [deliveryAddress, setdeliveryAddress] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')
    const { register, reset, handleSubmit, formState: { errors } } = useForm()

    const totalPrice = cartItems.reduce((acc, obj) => { return acc + discountedPrice(obj) * obj.quantity }, 0)
    const totalItems = cartItems.length


    const handleQuantity = (e, product) => {
        e.preventDefault()
        console.log("From Handle Qunatity: **********  : ", product.id)
        dispatch(updateItemAsync({ id: product.id, quantity: +e.target.value }))
    }

    const handleRemove = (e, product) => {
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
        e.preventDefault()
    }

    const handleAddress = (e) => {
        setdeliveryAddress(user[0].addresses[e.target.value])
    }

    const handlePayment = (e) => {
        setPaymentMethod(e.target.value)
    }

    const handleOrder = (e) => {
        e.preventDefault()
        const order = { cartItems, user: user.id, totalPrice, totalItems, deliveryAddress, paymentMethod, status: 'pending' }
        console.log(order)

        if (!cartItems) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Your Cart is Empty",
            });

        } else if (!deliveryAddress) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please select delivery address",
            });
        } else if (!paymentMethod) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Paease select payment method",
            });
        }
        else {
            // dispatch(createOrderAsync(order))
        }
    }

    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-2 lg:px-40 '>
                {/* INPUT FORM */}
                <form className='lg:px-25  px-10 bg-gray-100 ' onSubmit={handleSubmit((data) => {
                    const newUser = { ...user[0], addresses: [...user[0].addresses, data] }
                    dispatch(userAddress(newUser))
                    reset()
                })}>
                    <div className="  mt-10" >
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-3xl font-semibold leading-7 text-gray-900">Profile</h2>
                        </div>
                        <div className="border-b border-gray-900/10 pb-1"  >

                            <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Full name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register('name', { required: 'Name is required' })}
                                            id="first-name"
                                            required
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                        Street address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register('address', { required: 'Address is required' })}
                                            id="street-address"
                                            required
                                            autoComplete="street-address"
                                            className="block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    {errors.address && <p className='text-red-500'>{errors.address.message}</p>}
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                        City
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register('city', { required: 'City is required' })}
                                            id="city"
                                            required
                                            autoComplete="address-level2"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    {errors.city && <p className='text-red-500'>{errors.city.message}</p>}
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                        State / Province
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register('State', { required: 'State is required' })}
                                            id="region"
                                            required
                                            autoComplete="address-level1"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    {errors.State && <p className='text-red-500'>{errors.State.message}</p>}

                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                        ZIP / Postal code
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register('pincode', { required: 'pincode is required' })}
                                            id="postal-code"
                                            required
                                            autoComplete="postal-code"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    {errors.pincode && <p className='text-red-500'>{errors.pincode.message}</p>}

                                </div>

                                <div className="sm:col-span-2 sm:col-start-1 ">
                                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                        Phone
                                    </label>
                                    <div className="mt-2 ">
                                        <input
                                            type="tel"
                                            {...register('phone', { required: 'phone Number is required' })}
                                            id="phone"
                                            required
                                            autoComplete="address-level2"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className=" flex items-center  mb-5 mt-5 justify-center gap-x-6">
                                <button
                                    type="submit"
                                    className="rounded-md lg:w-36   text-black px-3 py-2 text-sm font-semibold shadow-sm min-w-fit  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Reset
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md lg:w-36 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm min-w-fit hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Save
                                </button>
                            </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12 lg:mt-7 lg:mb-7">
                            <h2 className=" font-semibold leading-7 text-2xl text-gray-900">Address</h2>
                            <div className="mt-1 space-y-10">                                
                                    {
                                        user[0].addresses.map((address, index) => (
                                            <li
                                                key={index}
                                                className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                                            >
                                                <div className="flex gap-x-4">
                                                    <input
                                                        onChange={(e) => handleAddress(e)}
                                                        name="address"
                                                        type="radio"
                                                        value={index}
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <div className="min-w-0 flex-auto">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                                            {address.name}
                                                        </p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                            {address.street}
                                                        </p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                            {address.pinCode}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="hidden sm:flex sm:flex-col sm:items-end">
                                                    <p className="text-sm leading-6 text-gray-900">
                                                        Phone: {address.phone}
                                                    </p>
                                                    <p className="text-sm leading-6 text-gray-500">
                                                        {address.city}
                                                    </p>
                                                </div>
                                            </li>
                                        ))
                                    }                                

                                <div className="mt-10 space-y-10">
                                    <fieldset>
                                        <h2 className=" font-semibold leading-7 text-2xl text-gray-900">   Payment Methods</h2>
                                        <div className="mt-6 space-y-6">
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="cash"
                                                    // name="payments"
                                                    onChange={handlePayment}
                                                    value="cash"
                                                    type="radio"
                                                    checked={paymentMethod === 'cash'}
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label
                                                    htmlFor="cash"
                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                >
                                                    Cash
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="card"
                                                    // name="payments"
                                                    onChange={handlePayment}
                                                    checked={paymentMethod === 'card'}
                                                    value="card"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label
                                                    htmlFor="card"
                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                >
                                                    Card Payment
                                                </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                {/* CART  */}
                <div>
                    {cartItems &&
                        <div className='px-10 py-5 bg-gray-100'>

                            <div className="mt-8">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {cartItems.map((product) => (
                                            <li key={product.id} className="flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        src={product.product.thumbnail}
                                                        // alt={product.imageAlt}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a href={product.href}>{product.product.title}</a>
                                                            </h3>
                                                            <p className="ml-4">${(discountedPrice(product) * (product.quantity))}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
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
                            <div className="border-t border-gray-200   py-6 sm:px-6 mt-5">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p >${totalPrice}</p>
                                </div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Total Items</p>
                                    <p >{totalItems}</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                <Link to='/checkout'>
                                    <div className="mt-6">
                                        <Link to='/orderplaced'>
                                            <div
                                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 lg:w-full "
                                                onClick={(e) => handleOrder(e)}
                                            >
                                                Order Now
                                            </div>
                                        </Link>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Checkout