import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from '../../navbar/navbar';
import { fetchProductDetail , updateExixtingProduct } from '../../product/productsSlice';
import { selectProductDetail } from '../../product/productsSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AdminProductEditForm() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const prod = useSelector(selectProductDetail);
  const { register, reset, setValue, handleSubmit, formState: { errors } } = useForm();

  const handleUpdate = (data) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!"
      }).then(result => {
        if (result.isConfirmed) {
            dispatch(updateExixtingProduct(data))
          Swal.fire("Success!", "Product has been Successfully Updated ","success");
        }
      });
    };    




  console.log(prod)

  
  useEffect(() => {
    dispatch(fetchProductDetail(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (prod.images[0]) {
      setValue('title', prod.title);
      setValue('description', prod.description);
      setValue('price', prod.price);
      setValue('discountPercentage', prod.discountPercentage);
      setValue('rating', prod.rating);
      setValue('stock', prod.stock);
      setValue('brand', prod.brand);
      setValue('category', prod.category);
      setValue('thumbnail', prod.thumbnail);
      setValue('firstImage', prod.images[0]);
      setValue('imageURL2', prod.images[1]);
      setValue('imageURL3', prod.images[2]);
      setValue('imageURL4', prod.images[3]);

      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [prod, setValue]);

  return (

    <>
      <Navbar />
      <div className="container mx-auto py-10 bg-gray-100">
        <div className=" shadow rounded-lg p-6 lg:px-20 bg-gray-100">       
        <button
                  className="rounded-md bg-indigo-600 mt-5 px-7  py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 float-end "  
                  onClick={() => navigate(`/productdetail/${prod.id}`)}            
                >Product Detail</button>   
          <form onSubmit={handleSubmit((data) => handleUpdate({...data , id:prod.id}))}> 
            <h2 className="text-3xl font-bold mb-6 text-gray-800"><u>Edit Product</u></h2>            
            {prod && (
              <h3 className="text-2xl font-medium mb-6 text-gray-600"><u>Editing:{prod.title}</u> </h3>
            )}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Product Title
                </label>
                <input
                  type="text"
                  id="title"
                  {...register('title', { required: 'Product Title is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
              </div>

              <div className="col-span-full sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  {...register('description', { required: 'Description is required' })}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Product description..."
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="float"
                  id="price"
                  {...register('price', { required: 'Price is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
              </div>

              <div>
                <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700">
                  Discount Percentage
                </label>
                <input
                  type="float"
                  id="discountPercentage"
                  {...register('discountPercentage', { required: 'Discount Percentage is required', min: 0, max: 99 })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.discountPercentage && (
                  <p className="text-red-500 text-sm mt-1">{errors.discountPercentage.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                  Rating
                </label>
                <input
                  type="float"
                  id="rating"
                  {...register('rating', { required: 'Rating is required', min: 1, max: 5 })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
              </div>

              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  type="float"
                  id="stock"
                  {...register('stock', { required: 'Stock is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
              </div>

              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  {...register('brand', { required: 'Brand is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  {...register('category', { required: 'Category is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
              </div>

              <div>
                <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
                  Thumbnail URL
                </label>
                <input
                  type="text"
                  id="thumbnail"
                  {...register('thumbnail', { required: 'Thumbnail URL is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail.message}</p>}
              </div>

              <div>
                <label htmlFor="imageURL1" className="block text-sm font-medium text-gray-700">
                  Image 1 URL
                </label>
                <input
                  type="text"
                  id="firstImage"
                  {...register('firstImage')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="imageURL2" className="block text-sm font-medium text-gray-700">
                  Image 2 URL
                </label>
                <input
                  type="text"
                  id="imageURL2"
                  {...register('imageURL2')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="imageURL3" className="block text-sm font-medium text-gray-700">
                  Image 3 URL
                </label>
                <input
                  type="text"
                  id="imageURL3"
                  {...register('imageURL3')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="imageURL4" className="block text-sm font-medium text-gray-700">
                  Image 4 URL
                </label>
                <input
                  type="text"
                  id="imageURL4"
                  {...register('imageURL4')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"                
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}










