import React from 'react'
import Navbar from '../features/navbar/navbar'
import AdminProductsList from '../features/admin/Component/AdminProductsList'
function Home() {
  return (
    <div>
      <Navbar/>
      <AdminProductsList/>
    </div>
  )
}

export default Home