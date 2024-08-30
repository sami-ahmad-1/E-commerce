
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addNewProduct } from '../../product/productsSlice';

export default function AdminProductForm() {
  const dispatch = useDispatch();
  const { register, reset, handleSubmit, formState: { errors } } = useForm();

  return (
    <div className="px-4 py-6 md:px-10 md:py-12 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8">Add New Product</h2>
        <form onSubmit={handleSubmit((data) => {
          const prodData = { ...data };
          prodData.images = [prodData.imageURL1, prodData.imageURL2, prodData.imageURL3, prodData.imageURL4];
          delete prodData.imageURL1;
          delete prodData.imageURL2;
          delete prodData.imageURL3;
          delete prodData.imageURL4;
          dispatch(addNewProduct(prodData));
          console.log('Product Added Successfully');
          reset();
        })}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Product Title</label>
              <input
                type="text"
                id="title"
                {...register('title', { required: 'Product Title is required' })}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${errors.title ? 'border-red-500' : ''}`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                {...register('description', { required: 'Description is required' })}
                rows={4}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${errors.description ? 'border-red-500' : ''}`}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                id="price"
                {...register('price', { required: 'Price is required' })}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${errors.price ? 'border-red-500' : ''}`}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>

            <div>
              <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700">Discount Percentage</label>
              <input
                min="0"
                max="100"
                type="number"
                id="discountPercentage"
                {...register('discountPercentage', { required: 'Discount Percentage is required', min: 0, max: 99 })}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${errors.discountPercentage ? 'border-red-500' : ''}`}
              />
              {errors.discountPercentage && <p className="text-red-500 text-sm mt-1">{errors.discountPercentage.message}</p>}
            </div>

            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
              <input
                min="0"
                max="5"
                type="number"
                id="rating"
                {...register('rating', { required: 'Rating is required', min: 1, max: 5 })}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${errors.rating ? 'border-red-500' : ''}`}
              />
              {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
              <input
                type="number"
                id="stock"
                {...register('stock', { required: 'Stock is required' })}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${errors.stock ? 'border-red-500' : ''}`}
              />
              {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
            </div>

            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
              <input
                type="text"
                id="brand"
                {...register('brand', { required: 'Brand is required' })}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${errors.brand ? 'border-red-500' : ''}`}
              />
              {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>}
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                id="category"
                {...register('category', { required: 'Category is required' })}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${errors.category ? 'border-red-500' : ''}`}
              />
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
            </div>

            <div>
              <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
              <input
                type="text"
                id="thumbnail"
                {...register('thumbnail', { required: 'Thumbnail URL is required' })}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${errors.thumbnail ? 'border-red-500' : ''}`}
              />
              {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail.message}</p>}
            </div>

            <div>
              <label htmlFor="imageURL1" className="block text-sm font-medium text-gray-700">Image 1 URL</label>
              <input
                type="text"
                id="imageURL1"
                {...register('imageURL1')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="imageURL2" className="block text-sm font-medium text-gray-700">Image 2 URL</label>
              <input
                type="text"
                id="imageURL2"
                {...register('imageURL2')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="imageURL3" className="block text-sm font-medium text-gray-700">Image 3 URL</label>
              <input
                type="text"
                id="imageURL3"
                {...register('imageURL3')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="imageURL4" className="block text-sm font-medium text-gray-700">Image 4 URL</label>
              <input
                type="text"
                id="imageURL4"
                {...register('imageURL4')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-x-4">
            <button
              type="button"
              onClick={() => reset()}
              className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


























// import React from 'react'
// import { useForm } from 'react-hook-form'
// import { useDispatch } from 'react-redux'
// import { addNewProduct } from '../../product/productsSlice'
// export default function AdminProductForm() {
//   const dispatch = useDispatch()
//   const { register, reset, handleSubmit, formState: { errors } } = useForm()


//   return (
//     <div className='px-5  md:py-10  '>
//       <div className=' md:px-20 lg:px-36'>
//         <form onSubmit={handleSubmit((data) => {
//           const prodData = { ...data }
//           prodData.images = [prodData.imageURL1, prodData.imageURL2, prodData.imageURL3, prodData.imageURL4,]
//           delete prodData['imageURL1']
//           delete prodData['imageURL2']
//           delete prodData['imageURL3']
//           delete prodData['imageURL4']
//           dispatch(addNewProduct(prodData))
//           console.log('Product Added Successfullly')
//           reset()
//         })}>
//           <div>
//             <div className="border-b border-gray-900/10 pb-12">
//               <h2 className="text-3xl font-semibold leading-7 text-gray-900">Add New Product</h2>
//               <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//                 <div className="sm:col-span-4">
//                   <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
//                     Product Title
//                   </label>
//                   <div className="mt-2">
//                     <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
//                       <input
//                         type="text"
//                         {...register('title', { required: 'Product Title is required' })}
//                         id="username"
//                         autoComplete="username"
//                         className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                       />
//                     </div>                    
//                       {errors.name && <p className='text-red-500'>{errors.name.message}</p>}                    
//                   </div>
//                 </div>

//                 <div className="col-span-full">
//                   <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
//                     Description
//                   </label>
//                   <div className="mt-2">
//                     <textarea
//                       placeholder='Product description...'
//                       id="about"
//                       {...register('description', { required: 'Product Title is required' })}
//                       rows={3}
//                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                       defaultValue={''}
//                     />
//                   </div>
//                   {errors.name && <p className='text-red-500'>{errors.name.message}</p>}

//                 </div>
//               </div>
//             </div>

//             <div className="sm:col-span-4">
//               <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
//                 Price
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
//                   <input
//                     type="number"
//                     {...register('price', { required: 'Product Title is required' })}
//                     id="username"
//                     autoComplete="username"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="sm:col-span-4">
//               <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
//                 Discount Percentage
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
//                   <input
//                     type="number"
//                     {...register('discountPercentage', { required: 'Discount is required' }, { min: 0, max: 99 })}
//                     id="username"
//                     autoComplete="username"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="sm:col-span-4">
//               <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
//                 Rating
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
//                   <input
//                     type="number"
//                     {...register('rating', { required: 'Rating is required' }, { min: 1, max: 5 })}
//                     id="username"
//                     autoComplete="username"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="sm:col-span-4">
//               <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
//                 Stock
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
//                   <input
//                     type="number"
//                     {...register('stock', { required: 'Stock is required' })}
//                     id="username"
//                     autoComplete="username"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="sm:col-span-4">
//               <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
//                 Brand
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
//                   <input
//                     type="text"
//                     {...register('brand', { required: 'Brand is required' })}
//                     id="username"
//                     autoComplete="username"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="sm:col-span-4">
//               <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
//                 Category
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
//                   <input
//                     type="text"
//                     {...register('Category', { required: 'Category is required' })}
//                     id="username"
//                     autoComplete="username"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="sm:col-span-4">
//               <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
//                 Thumbnail URL
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
//                   <input
//                     type="text"
//                     {...register('thumbnail', { required: 'Thumbnail URL is required' })}
//                     id="username"
//                     autoComplete="username"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="sm:col-span-4">
//               <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
//                 Image 1 URL
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
//                   <input
//                     type="text"
//                     {...register('imageURL1')}
//                     id="username"
//                     autoComplete="username"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="sm:col-span-4">
//               <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
//                 Image 2 URL
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
//                   <input
//                     type="text"
//                     {...register('imageURL2')}
//                     id="username"
//                     autoComplete="username"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="sm:col-span-4">
//               <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
//                 Image 3 URL
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
//                   <input
//                     type="text"
//                     {...register('imageURL3')}
//                     id="username"
//                     autoComplete="username"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="sm:col-span-4">
//               <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
//                 Image 4 URL
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
//                   <input
//                     type="text"
//                     {...register('imageURL4')}
//                     id="username"
//                     autoComplete="username"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>
//             </div>

//           </div>

//           <div className="mt-6 flex items-center  gap-x-6">
//             <button className="w-32 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => reset()}>
//               Reset
//             </button>
//             <button className="w-32 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//             >
//               {/* <button> */}
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

