import React from 'react'


const people = [
    {
        name: 'Leslie Alexander ',
        email: 'leslie.alexander@example.com',
        role: 'Co-Founder / CEO',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
        phone: 9988776655
    },
    {
        name: 'Michael Foster',
        email: 'michael.foster@example.com',
        role: 'Co-Founder / CTO',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
        phone: 9988776653
    },

    {
        name: 'Lindsay Walton',
        email: 'lindsay.walton@example.com',
        role: 'Front-end Developer',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
        phone: 9988776652

    }
]


const products = [
    {
        id: 1,
        name: 'Throwback Hip Bag',
        href: '#',
        color: 'Salmon',
        price: '$90.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
        id: 2,
        name: 'Medium Stuff Satchel',
        href: '#',
        color: 'Blue',
        price: '$32.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
]

function Checkout() {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 lg:px-40'>

            {/* INPUT FORM */}
            <form className='lg:px-25  px-10 '>
                <div className="space-y-12 lg:py-12 py-4 mt-10" >
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-3xl font-semibold leading-7 text-gray-900">Profile</h2>
                    </div>

                    <div className="border-b border-gray-900/10 pb-1">

                        <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                    Country
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option>India</option>
                                        <option>Nepal</option>
                                        <option>Sri Lanka</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Street address
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="street-address"
                                        id="street-address"
                                        autoComplete="street-address"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    City
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        autoComplete="address-level2"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                    State / Province
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="region"
                                        id="region"
                                        autoComplete="address-level1"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                    ZIP / Postal code
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="postal-code"
                                        id="postal-code"
                                        autoComplete="postal-code"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                                <div className=" flex items-center  mb-5 mt-5 justify-center gap-x-6">
                            <button
                                type="submit"
                                className="rounded-md lg:w-36   text-black px-3 py-2 text-sm font-semibold text-white shadow-sm min-w-fit  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className=" font-semibold leading-7 text-2xl text-gray-900">Address</h2>
                        <div className="mt-1 space-y-10">
                            <fieldset>
                                <legend className="text-sm  leading-6 text-gray-900">Choose from existing Address</legend>
                                <div className="mt-6 space-y-6">
                                    <ul role="list" className="divide-y divide-gray-100">
                                        {people.map((person) => (
                                            <li key={person.email} className="flex justify-between gap-x-6 py-5">
                                                <div className="flex items-center gap-x-3 text-m">
                                                    <input
                                                        id="payment-cash"
                                                        name="push-notifications"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300  text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                                        {person.phone}
                                                    </label>
                                                    <div className="flex min-w-0 gap-x-4">
                                                        <div className="min-w-0 flex-auto">
                                                            <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                                                        </div>
                                                    </div>
                                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                        <p className="text-sm leading-6 text-gray-900">{person.role}</p>
                                                        {person.lastSeen ? (
                                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                                Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                                                            </p>
                                                        ) : (
                                                            <div className="mt-1 flex items-center gap-x-1.5">
                                                                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                                </div>
                                                                <p className="text-xs leading-5 text-gray-500">Online</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend className="text-2xl font-semibold leading-6 text-gray-900">Payment Mode</legend>
                                <div className="mt-6 space-y-6">
                                    <div className="flex items-center gap-x-3 text-m">
                                        <input
                                            id="payment-cash"
                                            name="push-notifications"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300  text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                            Cash
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="payment-card"
                                            name="push-notifications"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Card
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        {/* <div className=" flex items-center  mb-5 mt-5 justify-center gap-x-6">
                            <button
                                type="submit"
                                className="rounded-md lg:w-36 bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm min-w-fit hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-md lg:w-36 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm min-w-fit hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save
                            </button>
                        </div> */}
                    </div>
                </div>


            </form>
            
            {/* CART  */}
            <div className='lg:px-50  px-10 mt-10'>
                <div >
                    <div >
                        <div >
                            <div >
                                <div >
                                   </div>

                                <div className="mt-8">
                                    <div className="flow-root">
                                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                                            {products.map((product) => (
                                                <li key={product.id} className="flex py-6">
                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                        <img
                                                            src={product.imageSrc}
                                                            alt={product.imageAlt}
                                                            className="h-full w-full object-cover object-center"
                                                        />
                                                    </div>

                                                    <div className="ml-4 flex flex-1 flex-col">
                                                        <div>
                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                <h3>
                                                                    <a href={product.href}>{product.name}</a>
                                                                </h3>
                                                                <p className="ml-4">{product.price}</p>
                                                            </div>
                                                            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                                        </div>
                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                            <p className="text-gray-500">Qty {product.quantity}</p>

                                                            <div className="flex">
                                                                <button
                                                                    type="button"
                                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
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
                            </div>

                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>$262.00</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                <div className="mt-6">
                                    <a
                                        href="#"
                                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700  "
                                    >
                                        Checkout
                                    </a>
                                </div>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}


export default Checkout