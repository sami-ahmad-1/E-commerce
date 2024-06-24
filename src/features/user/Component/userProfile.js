import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserInfo , updateUserInfoAsync } from '../userSlice'
import { useDispatch } from 'react-redux'

function UserProfile() {
  const dispatch = useDispatch()
  const userArr = useSelector(selectUserInfo)  
  const user = userArr[0]

  const handleDelete = (e, index) => {
    e.preventDefault()
    const data = { ...user, addresses: [...user.addresses] }
    data.addresses.splice(index, 1)    
    dispatch(updateUserInfoAsync(data))
    e.preventDefault()

  }

  return (
    <div className='px-44'>
      {user ?
        <div>
          <p className='text-4xl'>{user.name ? user.name : "New User"}</p>
          <p className='text-2xl mt-7 text-red-700'>Email : {user.email}</p>
          {user.role==='admin' &&  <p className='text-2xl mt-2 text-green-700'>User :{user.role}</p>}
          <div className='px-24'>
            <ul role="list" className="divide-y divide-gray-100">
              {user.addresses.map((data, index) => (
                <li key={index} className="flex justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{data.name}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">{data.city}</p>
                    </div>
                  </div>
                  <div className="min-w-0 flex-auto ml-44">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{data.name}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{data.city}</p>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">{data.pincode}</p>
                    <button className='text-red-400' value={user.id} onClick={(e) => handleDelete(e, index)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        :
        <h1 className='text-center bg-white text-4xl font-semibold'>User Not Logged in</h1>}
    </div>
  )
}

export default UserProfile