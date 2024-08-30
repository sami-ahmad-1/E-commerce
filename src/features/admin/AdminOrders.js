// import React, { useEffect, useState } from 'react'
// import { fetchAllOrderAsync, AllOrders } from '../order/orderSlice'
// import { useDispatch, useSelector } from 'react-redux'
// import { EyeIcon, PencilIcon } from '@heroicons/react/24/outline'
// import { updateOrderStatueAsync } from '../order/orderSlice'

// function AdminOrders() {
//     const dispatch = useDispatch()
//     const [showOrderStatus, setShowOrderStatus] = useState(-1)
//     const Orders = useSelector(AllOrders)

//     const handleOrderStatus = (e, OrderData) => {
//         e.preventDefault()
//         const updatedOrder = {...OrderData , status:e.target.value}        
//         dispatch(updateOrderStatueAsync(updatedOrder))
//         setShowOrderStatus(-1)        
//     }

//     const statusColor = (status) =>{
//         switch (status){
//             case 'Pending':
//               return 'bg-purple-200 text-purple-600'
//               break;
//             case 'Assigned':
//                return 'bg-yellow-200 text-yellow-600'
//               break;
//             case 'Delivered':
//               return 'bg-green-200 text-green-600'
//               break;
//             case 'Cancel':
//                return 'bg-red-200 text-red-600'
//               break;
//             default:
//                return 'bg-purple-200 text-purple-600'
//           }
//     }

//     const handleEdit = (e, data) => {
//         e.preventDefault()
//         console.log(data)
//     }
//     const handelShow = (e, OrderData) => {
//         e.preventDefault()
//         setShowOrderStatus(OrderData.id)
//     }

//     useEffect(() => {
//         dispatch(fetchAllOrderAsync())
//     }, [])

//     return (
//         <>
//             <div className="overflow-x-auto">
//                 <div className="min-w-screen min-h-screen flex  justify-center bg-gray-100 font-sans overflow-hidden">
//                     <div className="w-full lg:w-5/6">
//                         <div className="bg-white shadow-md rounded my-6">
//                             <table className="min-w-max w-full table-auto">
//                                 <thead>
//                                     <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//                                         <th className="py-3 px-6 text-left">Order Number</th>
//                                         <th className="py-3 px-6 text-left">Title</th>
//                                         <th className="py-3 px-6 text-center">Total Amount</th>
//                                         <th className="py-3 px-6 text-center">Status</th>
//                                         <th className="py-3 px-6 text-center">Actions</th>
//                                     </tr>
//                                 </thead>

//                                 {Orders && Orders.map((OrderData, index) => (

//                                     <tbody className="text-gray-600 text-sm font-light">
//                                         <tr className="border-b border-gray-200 hover:bg-gray-100">

//                                             <td className="py-3 px-6 text-left whitespace-nowrap">
//                                                 <div className="flex items-center">
//                                                     <span className="font-medium ml-10">{OrderData.id}</span>
//                                                 </div>
//                                             </td>
//                                             <td className="py-3 px-6 text-center">
//                                                 {OrderData.cartItems.map((OrderItem) => (
//                                                     <>
//                                                         <div className="flex items-center  font-semibold">
//                                                             <span>{OrderItem.title}</span>  - {OrderItem.quantity}
//                                                         </div>
//                                                     </>
//                                                 ))}
//                                             </td>
//                                             <td className="py-3 px-6 text-center">
//                                                 <div className="flex items-center  font-semibold justify-center">
//                                                     $ {OrderData.totalPrice}
//                                                 </div>
//                                             </td>
//                                             <td className="py-3 px-6 text-center">
//                                                 {showOrderStatus == OrderData.id ?
//                                                     <select onChange={(e) => handleOrderStatus(e, OrderData)} >
//                                                         <option value="Pending">Pending</option>
//                                                         <option value="Assigned">Assigned</option>
//                                                         <option value="Delivered">Delivered</option>
//                                                         <option value="Cancel">Cancel</option>
//                                                     </select>
//                                                     :
//                                                     <span className={`${statusColor(OrderData.status)} py-1 px-3 rounded-full text-l`}>
//                                                         {OrderData.status}
//                                                     </span>
//                                                 }

//                                             </td>

//                                             <td className="py-3 px-6 text-center">
//                                                 <div className="flex item-center justify-center ">
//                                                     <div className=" mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer  h-5 w-5" >
//                                                         <EyeIcon onClick={(e) => handleEdit(e, OrderData)} />
//                                                     </div>
//                                                     <div className="h-5 w-5 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer" onClick={(e) => handelShow(e, OrderData)}>
//                                                         <PencilIcon />
//                                                     </div>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     </tbody>
//                                 ))}
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>

//     )
// }

// export default AdminOrders





import React, { useEffect, useState } from 'react'
import { fetchAllOrderAsync, AllOrders } from '../order/orderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { EyeIcon, PencilIcon } from '@heroicons/react/24/outline'
import { updateOrderStatueAsync } from '../order/orderSlice'

function AdminOrders() {
    const dispatch = useDispatch()
    const [showOrderStatus, setShowOrderStatus] = useState(-1)
    const Orders = useSelector(AllOrders)
    
    console.log("All Order are  : " , Orders)

    const handleOrderStatus = (e, OrderData) => {
        e.preventDefault()
        const updatedOrder = {...OrderData , status:e.target.value}        
        dispatch(updateOrderStatueAsync(updatedOrder))
        setShowOrderStatus(-1)        
    }

    const statusColor = (status) =>{
        switch (status){
            case 'Pending':
              return 'bg-purple-200 text-purple-600'
              break;
            case 'Assigned':
               return 'bg-yellow-200 text-yellow-600'
              break;
            case 'Delivered':
              return 'bg-green-200 text-green-600'
              break;
            case 'Cancel':
               return 'bg-red-200 text-red-600'
              break;
            default:
               return 'bg-purple-200 text-purple-600'
          }
    }

    const handleEdit = (e, data) => {
        e.preventDefault()
        console.log(data)
    }
    const handelShow = (e, OrderData) => {
        e.preventDefault()
        setShowOrderStatus(OrderData.id)
    }

    useEffect(() => {
        dispatch(fetchAllOrderAsync())
    }, [])

    return (
        <>
            <div className="overflow-x-auto">
                <div className="min-w-screen min-h-screen flex  justify-center bg-gray-100 font-sans overflow-hidden">
                    <div className="w-full lg:w-5/6">
                        <div className="bg-white shadow-md rounded my-6">
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">Order Number</th>
                                        <th className="py-3 px-6 text-left">Title</th>
                                        <th className="py-3 px-6 text-center">Total Amount</th>
                                        <th className="py-3 px-6 text-center">Status</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>

                                {Orders && Orders.map((OrderData, index) => (

                                    <tbody className="text-gray-600 text-sm font-light">
                                        <tr className="border-b border-gray-200 hover:bg-gray-100">

                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <span className="font-medium ml-10">{OrderData.id}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                {OrderData.cartItems.map((OrderItem) => (
                                                    <>
                                                        <div className="flex items-center  font-semibold">
                                                            <img src={OrderItem.product.thumbnail} className='w-16 h-16 rounded-full' alt="" />                                                            
                                                            <span className='font-bold'>{OrderItem.product.title}</span>  -    Quantity : {OrderItem.quantity}
                                                        </div>
                                                    </>
                                                ))}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex items-center  font-semibold justify-center">
                                                    $ {OrderData.totalPrice}
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                {showOrderStatus == OrderData.id ?
                                                    <select onChange={(e) => handleOrderStatus(e, OrderData)} >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Assigned">Assigned</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Cancel">Cancel</option>
                                                    </select>
                                                    :
                                                    <span className={`${statusColor(OrderData.status)} py-1 px-3 rounded-full text-l`}>
                                                        {OrderData.status}
                                                    </span>
                                                }

                                            </td>

                                            <td className="py-3 px-6 text-center">
                                                <div className="flex item-center justify-center ">
                                                    <div className=" mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer  h-5 w-5" >
                                                        <EyeIcon onClick={(e) => handleEdit(e, OrderData)} />
                                                    </div>
                                                    <div className="h-5 w-5 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer" onClick={(e) => handelShow(e, OrderData)}>
                                                        <PencilIcon />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default AdminOrders