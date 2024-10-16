import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { cartItemsSlice } from '../cart/cartSlice'
import { selectLoggedInUser } from '../auth/authSlice'
import { selectUserInfo } from '../user/userSlice'


const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://p7.hiclipart.com/preview/782/114/405/5bbc3519d674c.jpg',
}
const navigation = [
    { name: 'Profile', href: '/profile', current: true },
    { name: 'Order', href: '/userorder', current: false },
    { name: 'Login', href: '/login', current: false },
    { name: 'Sign Out', href: '/logout', current: false }    
]


const items = [
    { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
    { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
    { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
]
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Navbar() {
    const LoggedInuser = useSelector(selectUserInfo)
    const cartItems = useSelector(cartItemsSlice)
    const [cartItemsLength, setCartItemsLength] = useState('')

    useEffect(() => {
        if (LoggedInuser != null) {
            if (cartItems) {
                setCartItemsLength(cartItems.length);
            }
        }
    }, [cartItems]);
    return (
        <>
            <div className="min-h-full ">
                <Disclosure as="nav" className="bg-gray-800">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <Link to='/'>
                                                <img
                                                    className="h-8 w-8"
                                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                                    alt="Your Company"

                                                />
                                            </Link>
                                        </div>
                                        {/* <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4">

                                                {navigation.map((item) => (
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        className={classNames(
                                                            item.current
                                                                ? 'bg-gray-900 text-white'
                                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                            'rounded-md px-3 py-2 text-sm font-medium'
                                                        )}
                                                        aria-current={item.current ? 'page' : undefined}
                                                    >
                                                        {item.name}
                                                    </a>
                                                ))}

                                            </div>
                                        </div> */}
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            <Link to="/cartpage">
                                                <div
                                                    type="button"
                                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                                >
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">View notifications</span>

                                                    <ShoppingCartIcon className="h-6 w-6 " aria-hidden="true" />

                                                    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-red-600/10 ">
                                                        {cartItemsLength}
                                                    </span>
                                                </div>
                                            </Link>

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="absolute -inset-1.5" />
                                                        <span className="sr-only">Open user menu</span>
                                                        <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <Link to='/profile'>
                                                            <p className='block px-4 py-2 text-sm text-gray-700'>My Profile</p>
                                                        </Link>
                                                        <Link to='/userorder'>
                                                            <p className='block px-4 py-2 text-sm text-gray-700'>My Orders</p>
                                                        </Link>
                                                        <Link to='/login'>
                                                            <p className='block px-4 py-2 text-sm text-gray-700'>Login</p>
                                                        </Link>
                                                        <Link to='/logout'>
                                                            <p className='block px-4 py-2 text-sm text-gray-700'>Sign Out</p>
                                                        </Link>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Link to='/cartpage'>
                                        <div className='mr-5'>
                                            <ShoppingCartIcon className="h-6 w-6 text-white" aria-hidden="true"  />
                                            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-red-600/10 ">
                                                {cartItemsLength}
                                            </span>
                                        </div>
                                        </Link>
                                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'block rounded-md px-3 py-2 text-base font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <main>
                    <div className="mx-auto max-w-7xl  sm:px-6 lg:px-8">{/* Your content */}</div>
                </main>
            </div >
        </>
    )
}

export default Navbar