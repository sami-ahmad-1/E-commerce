import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../auth/authSlice';
import PleaseLoginCom from '../../Loading/PleaseLoginCom'
import { selectUserInfo, updateUserInfoAsync, fetchLoggedInUserAsync } from '../userSlice'
import {userAddress} from '../../auth/authSlice'
import UserAddressAdd from './userAddressAdd'
import { useDispatch } from 'react-redux'
import { MdDelete } from 'react-icons/md'
import Swal from 'sweetalert2'

function UserProfile() {
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)
  const [showAddressForm, setShowAddressForm] = useState(false)
  console.log(user)

  const handleFormShow = () => {
    setShowAddressForm(!showAddressForm)
  }

  // console.log('Logged in user', user)

  const handleDelete = (e, index) => {
    e.preventDefault()
    const newUser = { ...user ,addresses:[...user.addresses]};
    newUser.addresses.splice(index, 1);
    console.log('Modified ',newUser)
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
        dispatch(userAddress(newUser))
        Swal.fire({
          title: "Deleted!",
          text: "Your Address has been deleted.",
          icon: "success"
        });
      }
    })
  }


  return (
    <div className='px-44 mt-10'>
      {
        user ?
          <div>
            {
              <div>
                <div className='flex flex-row justify-between mb-5'>
                  <p className='text-2xl '>Email : {user.email}</p>
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleFormShow()}>
                    Add Address
                  </button>
                </div>

                <div>
                  {showAddressForm && <UserAddressAdd  />}
                </div>

                <div className='mb-4'>
                  {user.role === 'admin' && <p className='text-2xl mt-2 text-green-700'>User : {user.role}</p>}
                </div>

                <div className='px-24 bg-gray-100 py-5'>
                  <div className='mt-5 text-3xl'> Address</div>
                  <ul role="list" className="divide-y divide-gray-100 mt-5">
                    {user.addresses.map((data2, index2) => (
                      <li key={index2} className="flex justify-between gap-x-6 px-10 py-5 mt-4 bg-gray-200  ">
                        <div className="flex min-w-0 gap-x-4 ">
                          <div className="min-w-0 flex-auto">
                            <p className="text-xl font-semibold leading-6 text-gray-900">{data2.name}</p>
                          </div>
                        </div>
                        <div className="min-w-0 flex-auto ml-44">
                          <p className="text-sm font-semibold leading-6 text-gray-900">{data2.address}</p>
                          <p className="mt-1 truncate font-semibold text-xl leading-5 text-gray-500">{data2.city}</p>
                        </div>
                        <div className="flex shrink-0 sm:flex sm:flex-col sm:items-end ">
                          <p className="leading-6 text-gray-900">{data2.phone}</p>
                          <MdDelete className='text-2xl cursor-pointer' onClick={(e) => handleDelete(e, index2)} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            }
          </div>
          :
          <PleaseLoginCom></PleaseLoginCom>
      }
    </div>
  )

}
export default UserProfile