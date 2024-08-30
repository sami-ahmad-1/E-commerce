import { useForm } from 'react-hook-form'
import { selectLoggedInUser, userAddress } from '../../auth/authSlice'
import React, {  useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo, updateUserInfoAsync } from '../userSlice';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import PleaseLoginCom from '../../Loading/PleaseLoginCom';

function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const { register, reset, setValue, handleSubmit, formState: { errors } } = useForm()

  const toggleAddressForm = () => {
    setShowAddressForm(prev => !prev);
  };

  const showAddressUpdateForm = () => {
    setShowAddressForm(true)
  }


  const handleDelete = (e, index) => {
    e.preventDefault();

    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(userAddress(newUser));
        Swal.fire("Deleted!", "Your address has been deleted.", "success");
      }
    });
  };

  console.log("INITIAL USER" ,  user)
  
  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    console.log("NEW USER" ,  {newUser})
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(userAddress(newUser));
    // dispatch(updateUserInfoAsync(newUser));
    setSelectedEditIndex(-1);
  };

  const handleEditForm = (e, index) => {
    // showAddressUpdateForm()
    setSelectedEditIndex(index);
    const address = user.addresses[index];
    setValue('name', address.name);
    setValue('street', address.street);
    setValue('city', address.city);
    setValue('State', address.State);
    setValue('pincode', address.pincode);
    setValue('phone', address.phone);
  };

  console.log("User", user)

  if (!user) {
    return <PleaseLoginCom />;
  }


  return (

    <div className="lg:max-w-[90%] mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <p className="text-xl font-semibold text-gray-800">Email: {user.email}</p>
        <button
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-lg shadow-md"
          onClick={toggleAddressForm}
        >
          Add Address
        </button>
      </div>

      {showAddressForm && (
        <div className="mb-8">
          <form className='lg:px-11 bg-gray-100 ' onSubmit={handleSubmit((data) => {
            const newUser = { ...user, addresses: [...user.addresses, data] }
            dispatch(userAddress(newUser))
            toggleAddressForm()
            reset()
          })}>
            <div className="py-5 px-5  " >
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-3xl font-semibold leading-7 text-gray-900">Profile</h2>
              </div>
              <div className="border-b border-gray-900/10 pb-1"  >

                <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
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
                        autoComplete="street"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label htmlFor="city" className="block text-sm  font-medium leading-6 text-gray-900">
                      Street
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('street', { required: 'Street is required' })}
                        id="street"
                        required
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.street && <p className='text-red-500'>{errors.street.message}</p>}
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
      )}

      {user.role === 'admin' && (
        <div className="mb-6 text-center sm:text-left">
          <p className="text-lg font-medium text-green-600">Role: {user.role}</p>
        </div>
      )}
      <div className="bg-gray-50 lg:p-6 rounded-lg shadow-inner">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Address</h2>
        <ul role="list" className="space-y-6">
          {user.addresses.map((address, index) => (
            <div>

              {selectedEditIndex === index ? (
                <form
                  className="bg-white px-5 py-12 mt-12"
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    console.log(data);
                    handleEdit(data, index);
                    reset();
                  })}
                >
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                        Personal Information
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Use a permanent address where you can receive mail.
                      </p>

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
                            autoComplete="street"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label htmlFor="city" className="block text-sm  font-medium leading-6 text-gray-900">
                          Street
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register('street', { required: 'Street is required' })}
                            id="street"
                            required
                            autoComplete="address-level2"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        {errors.street && <p className='text-red-500'>{errors.street.message}</p>}
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
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        onClick={(e) => setSelectedEditIndex(-1)}
                        type="submit"
                        className="rounded-md bg-red-600 hover:bg-red-400 text-white px-3 py-2 text-sm font-semibold text-grey shadow-sm hover:bg-grey-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Cancel
                      </button>                    
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Edit Address
                      </button>
                    </div>
                  </div>
                </form>
              ) : null}

              <li key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="flex-1">
                  <p className="text-lg font-bold text-gray-900">{address.name}</p>
                  <p className="text-sm text-gray-700 mt-1">{address.address}</p>
                  <p className="text-sm text-gray-700 mt-1">{address.city}, {address.State} - {address.pincode}</p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center justify-end " >
                  <p className="text-sm font-medium text-gray-900 mr-4">Phone : {address.phone}</p>
                  <MdDelete className="text-2xl text-red-400 cursor-pointer hover:text-red-700" onClick={(e) => handleDelete(e, index)} />

                  <button
                    onClick={(e) => { handleEditForm(e, index) }}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500 px-5"
                  >
                    Edit
                  </button>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>


  );
}

export default UserProfile;









