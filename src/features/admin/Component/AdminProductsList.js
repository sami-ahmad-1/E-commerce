import React, { useEffect, useState } from 'react';
import { Fragment } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProductsAsync, selectAllProducts, fetchAllProductsbyFilter ,RemoveProductFromListAsync} from '../../product/productsSlice';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { ProductListDiscountedPrice } from '../../../app/Constants';
import { selectLoggedInUser } from '../../auth/authSlice';
import { fetchProductByUserId } from '../../cart/cartSlice'
import Swal from 'sweetalert2';

const sortOptions = [
  { name: 'Best Rating', sort: 'rating', order: 'desc', current: false },
  { name: 'Price: Low to High', sort: 'price', order: 'asc', current: false },
  { name: 'Price: High to Low', sort: 'price', order: 'desc', current: false },
]

const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'beauty', label: 'beauty', checked: false },
      { value: 'fragrances', label: 'fragrances', checked: false },
      { value: 'furniture', label: 'furniture', checked: false },
      { value: 'groceries', label: 'groceries', checked: false },
      { value: 'home-decoration', label: 'home-decoration', checked: false },
      { value: 'furniture', label: 'furniture', checked: false },
      { value: 'tops', label: 'tops', checked: false },
      { value: 'kitchen-accessories', label: 'kitchen-accessories', checked: false },
      { value: 'laptops', label: 'laptops', checked: false },
      { value: 'mens-shirts', label: 'mens shirts', checked: false },
      { value: 'mens-shoes', label: 'mens shoes', checked: false },
      { value: 'mens-watches', label: 'mens watches', checked: false },
      { value: 'womens-watches', label: 'womens watches', checked: false },
      { value: 'mobile-accessories', label: 'mobile-accessories', checked: false },
      { value: 'electronics', label: 'electronics', checked: false },
    ]
  },
  {
    id: 'brand',
    name: 'Brand',
    options: [
      { value: 'Essence', label: 'Essence', checked: false },
      { value: 'Glamour Beauty', label: 'Glamour Beauty', checked: false },
      { value: 'Velvet Touch', label: 'Velvet Touch', checked: false },
      { value: 'Chic Cosmetics', label: 'Chic Cosmetics', checked: false },
      { value: 'Nail Couture', label: 'Nail Couture', checked: false },
      { value: 'Calvin Klein', label: 'Calvin Klein', checked: false },
      { value: 'Chanel', label: 'Chanel', checked: false },
      { value: 'Dior', label: 'Dior', checked: false },
      { value: 'Dolce & Gabbana', label: 'Dolce & Gabbana', checked: false },
      { value: 'Gucci', label: 'Gucci', checked: false },
      { value: 'Annibale Colombo', label: 'Annibale Colombo', checked: false },
      { value: 'Furniture Co.', label: 'Furniture Co.', checked: false },
      { value: 'Knoll', label: 'Knoll', checked: false },
      { value: 'Bath Trends', label: 'Bath Trends', checked: false },
      { value: 'Apple', label: 'Apple', checked: false },
      { value: 'Asus', label: 'Asus', checked: false },
      { value: 'Huawei', label: 'Huawei', checked: false },
      { value: 'Lenovo', label: 'Lenovo', checked: false },
      { value: 'Dell', label: 'Dell', checked: false },
      { value: 'Fashion Trends', label: 'Fashion Trends', checked: false },
      { value: 'Gigabyte', label: 'Gigabyte', checked: false },
      { value: 'Classic Wear', label: 'Classic Wear', checked: false },
      { value: 'Casual Comfort', label: 'Casual Comfort', checked: false },
      { value: 'Urban Chic', label: 'Urban Chic', checked: false },
      { value: 'Nike', label: 'Nike', checked: false },
      { value: 'Puma', label: 'Puma', checked: false },
      { value: 'Off White', label: 'Off White', checked: false },
      { value: 'Fashion Timepieces', label: 'Fashion Timepieces', checked: false },
      { value: 'Longines', label: 'Longines', checked: false },
      { value: 'Rolex', label: 'Rolex', checked: false },
      { value: 'Amazon', label: 'Amazon', checked: false }
    ]
  },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function MobileFilter(props) {

  return (
    <div>
      <Transition.Root show={props.mobileFiltersOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={props.setMobileFiltersOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => props.setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>
                  {/* <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                        {subCategories.map((category) => (
                          <li key={category.name}>
                            <a href={category.href} className="block px-2 py-3">
                              {category.name}
                            </a>
                          </li>
                        ))}
                      </ul> */}

                  {filters.map((section) => (
                    <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">{section.name}</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex items-center">
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    onChange={e => props.handleFilter(e, section, option)}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}


function DesktopFilter(props) {

  return (
    <div>
      {filters.map((section) => (
        <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">{section.name}</span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        onChange={e => props.handleFilter(e, section, option)}
                        // onClick={props.setPage(0)}

                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  )
}


function Pagination(props) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  })
  return (
    <div className="flex mt-7 items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(props.page * 10) + 1}</span> to <span className="font-medium">{(props.page + 1) * 10}</span> of{' '}
            <span className="font-medium">{props.totalProduct}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <p
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 "
              onClick={() => props.handlePagination(props.page - 1)}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </p>
            {[...Array(props.totalPage)].map((_, i) => {
              return (
                <span
                  key={i}
                  className={`relative z-10 inline-flex items-center  ${props.page == i ? 'bg-indigo-600' : 'bg-white text-black'} bg-indigo-600 px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer`}
                  onClick={() => props.handlePagination(i)}
                >
                  {i + 1}
                </span>
              )
            })}


            <p
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => props.handlePagination(props.page + 1)}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </p>
          </nav>
        </div>
      </div>
    </div>
  )
}

function Card(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
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
        dispatch(RemoveProductFromListAsync(product))
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

  
  return (
    <div className="bg-white ">
      <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8">
        <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
          {props.products.slice(props.page * 10, (props.page + 1) * 10).map((product) => (
            <div >
              <Link to={`/admin/productdetail/${product.id}`} >
                <div key={product.id} className="group relative ">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 ">
                    <img
                      src={product.thumbnail}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={product.href}>
                          <span aria-hidden="true" className="absolute inset-0 " />
                          <p className='text-base font-medium  text-gray-900'>{product.title}</p>
                        </a>
                      </h3>
                      <div className='flex'>
                        <p className="mt-1 text-sm text-gray-500">{product.rating}</p>
                        <div className="flex items-center ml-4">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                `${product.rating}` > rating ? 'text-yellow-500' : 'text-gray-200',
                                'h-5 w-5 flex-shrink-0'
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium  text-gray-900">${ProductListDiscountedPrice(product)}</p>
                      <p className="text-sm font-medium line-through text-gray-400">${product.price}</p>
                    </div>
                  </div>
                </div >
              </Link>
              <div className='flex justify-between px-1'>
                <button
                  className="rounded-md bg-indigo-600 mt-5 px-7  py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  "
                  onClick={() => navigate(`/admin/adminProductEditForm/${product.id}`)}
                >Edit</button>
                <button
                  className="rounded-md bg-red-600 mt-5 px-7  py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  "
                  onClick={(e,ptoduct) => handleRemove(e,product.id)}
                >Delete</button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div >
  )
}


function SortButton(props) {
  return (
    <div className="flex items-center">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
            Sort
            <ChevronDownIcon
              className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
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
          <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {sortOptions.map((option) => (
                <Menu.Item key={option.name}>
                  {({ active }) => (
                    <p
                      onClick={e => props.handleSort(e, option)}
                      className={classNames(
                        option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm', 'cursor-pointer'
                      )}

                    >
                      {option.name}
                    </p>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
        <span className="sr-only">View grid</span>
        <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
        onClick={() => props.setMobileFiltersOpen(true)}
      >
        <span className="sr-only">Filters</span>
        <FunnelIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  )
}




export default function AdminProducts() {
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [filter, setFilter] = useState({})
  const products = useSelector(selectAllProducts)
  // console.log('Products in Home Page', products)
  const [page, setPage] = useState(0)    // 3
  const totalProduct = products.length    //100
  const totalPage = (Math.floor(totalProduct / 10)) + 1     // 10

  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter, [section.id]: option.value }
    setFilter(newFilter)
    dispatch(fetchAllProductsbyFilter(newFilter))
  };

  const handleSort = (e, option) => {
    const newFilter = { ...filter, _sort: option.sort, _order: option.order }
    setFilter(newFilter)
    dispatch(fetchAllProductsbyFilter(newFilter))
  }
  const handlePagination = (selectedPage) => {
    if (selectedPage >= 0 && selectedPage <= totalPage) {
      setPage(selectedPage)
    }
  }

  const user = useSelector(selectLoggedInUser)

  useEffect(() => {
    dispatch(fetchAllProductsAsync())
    if (user !== null) {
      dispatch(fetchProductByUserId(user.id))
    }
  }, [])

  return (
    <div>
      <div className="bg-white py-14">
        <div>
          <MobileFilter setMobileFiltersOpen={setMobileFiltersOpen} handleFilter={handleFilter} mobileFiltersOpen={mobileFiltersOpen} />
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 ">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>
              <SortButton handleSort={handleSort} setMobileFiltersOpen={setMobileFiltersOpen} />
            </div>
            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>
                  <DesktopFilter setMobileFiltersOpen={setMobileFiltersOpen} handleFilter={handleFilter} setPage={setPage} />
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  <Link to='/admin/productform'>
                    <button className=" mx-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                      Add Product
                    </button>
                  </Link>
                  <Link to='/admin/adminorderpage'>
                    <button className=" mx-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                      Order Page
                    </button>
                  </Link>
                  <Card products={products} page={page} />
                  <Pagination handlePagination={handlePagination} page={page} totalPage={totalPage} totalProduct={totalProduct} />
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
























