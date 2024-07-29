import React, { useEffect } from 'react'
import { SignOutAsync } from '../authSlice'
import { useSelector,useDispatch } from 'react-redux'
import { selectLoggedInUser } from '../authSlice'
import { Navigate } from 'react-router-dom'

function Logout() {
    const dispatch = useDispatch()
    const user = useSelector(selectLoggedInUser)
    console.log("Logged in user is  : ",user)
    useEffect(() => {
        dispatch(SignOutAsync(user))
    },[])
  return (
    <div>
        {!user && <Navigate to='/login' replace={true}></Navigate>}
    </div>
  )
}

export default Logout