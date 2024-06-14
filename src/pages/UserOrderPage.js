import React from 'react'
import UserOrder from '../features/user/Component/userOrders'
import Navbar from '../features/navbar/navbar'

function UserOrderPage() {
  return (
    <div>
        <Navbar/>
        <UserOrder/>
    </div>
  )
}

export default UserOrderPage