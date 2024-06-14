import React from 'react'
import { useSelector } from 'react-redux'
import { orderItems } from './orderSlice'
import { selectLoggedInUser } from '../auth/authSlice'


function Order() {
  const order = useSelector(orderItems)
  const user = useSelector(selectLoggedInUser)  
  console.log(user)
  console.log(order)
  return (
    <div>order</div>
  )
}

export default Order