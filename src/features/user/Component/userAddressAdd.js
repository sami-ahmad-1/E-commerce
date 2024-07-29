import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { selectLoggedInUser, userAddress } from '../../auth/authSlice'

function UserAddressAdd(props) {
  const dispatch = useDispatch()  
  const user = useSelector(selectLoggedInUser)
  const { register, reset, handleSubmit, formState: { errors } } = useForm()


  return (
    <div >
      <form className='lg:px-25  px-10 bg-gray-100 ' onSubmit={handleSubmit((data) => {
        dispatch(userAddress({ ...user, addresses: [...user.addresses, data] })) 
        console.log(data)

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
        </div>
      </form>
    </div>
  )
}

export default UserAddressAdd