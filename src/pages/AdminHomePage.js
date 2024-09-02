import React from 'react'
import AdminNavabar from '../features/navbar/AdminNavabar'
import AdminProductsList from '../features/admin/Component/AdminProductsList'
import Footer from '../features/Footer/Footer'
function Home() {
  return (
    <div>
      <AdminNavabar/>
      <AdminProductsList/>
      <Footer/>
    </div>
  )
}

export default Home