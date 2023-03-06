import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import swal from 'sweetalert';

const UploadProduct = () => {
   // useState
   const [imgUrl, setImgUrl] = useState(null);
   const [loading, setLoading] = useState(null);
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);

   // product image upload function
   const handleImageUpload = async (e) => {
      e.preventDefault();
      const imgData = new FormData();
      imgData.set('key', '4c22a8d6e3fbfd548bd286f1ab74cbe6');
      imgData.append('image', e.target.files[0]);

      setLoading(true);
      setError(false);
      setSuccess(false);

      try {
         const productImage = await axios.post(
            'https://api.imgbb.com/1/upload',
            imgData
         );
         if (productImage.status === 200) {
            setImgUrl(productImage.data.data.display_url);
            setLoading(false);
            setSuccess(true);
         }
         console.log(productImage.data.data.display_url);
      } catch (error) {
         setLoading(false);
         setError(true);
         setSuccess(false);
      }
   };

   const handleResetForm = () => {
      window.location.reload();
   };

   // product upload
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm();

   const onSubmit = async (data) => {
      const { product_title, product_price, product_status, product_detail } =
         data;

      setLoading(true);
      setSuccess(false);
      try {
         const product = await axios.post(
            'http://localhost:2000/api/products',
            {
               product_image: imgUrl,
               product_title,
               product_price,
               product_status,
               product_detail,
            }
         );
         if (product.status === 201) {
            swal({
               title: 'Good job!',
               text: 'Product publish successfully',
               icon: 'success',
            });
            setLoading(false);
            setSuccess(null);
            reset();
         }
      } catch (error) {
         swal({
            title: error.product.statusText,
            text: error.message,
            icon: 'warning',
         });
      }
   };

   return (
      <div className='w-full flex justify-center lg:px-8 xl:px-14'>
         <div className='space-y-8 w-full text-center'>
            <h3 className='capitalize font-bold text-xl md:text-2xl mt-16'>
               upload product
            </h3>
            <div className='px-6 md:px-0 pb-10 md:pb-0'>
               <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                  <div className='w-full sm:w-10/12 md:w-8/12 lg:w-6/12 m-auto space-y-1'>
                     <input
                        type='file'
                        name='product_image'
                        id=''
                        onChange={handleImageUpload}
                        className='px-3 py-4 w-full rounded-md border border-gray-304 bg-white'
                        required
                     />
                     {loading && (
                        <div>
                           <span className='font-bold'>
                              Image uploading is on progress...
                           </span>
                        </div>
                     )}

                     {success && (
                        <div>
                           <span className='text-green-600 font-bold'>
                              Image Upload Successfully Done.
                           </span>
                        </div>
                     )}

                     {error && (
                        <div>
                           <span className='text-red-600 font-bold'>
                              !Sorry Image Upload Failed
                           </span>
                        </div>
                     )}
                  </div>

                  <div className='w-full sm:w-10/12 md:w-8/12 lg:w-6/12 m-auto'>
                     <input
                        type='text'
                        name='product_title'
                        id=''
                        className='px-3 py-4 w-full rounded-md border border-gray-304'
                        placeholder='Product Title'
                        required
                        {...register('product_title', {
                           required: true,
                           maxLength: 200,
                        })}
                     />
                     {errors.product_title?.type === 'maxLength' && (
                        <p role='alert'>Maximum 200 character is allowed</p>
                     )}
                  </div>

                  <div className='lg:flex justify-between items-center w-full sm:w-10/12 md:w-8/12 lg:w-6/12 m-auto space-y-5 lg:space-y-0 lg:space-x-3'>
                     <div className='w-full lg:w-6/12'>
                        <input
                           type='number'
                           name='product_price'
                           id=''
                           className='px-3 py-4 w-full rounded-md border border-gray-304'
                           placeholder='Product Price'
                           required
                           {...register('product_price', {
                              required: true,
                              min: 1,
                           })}
                        />
                        {errors.product_price?.type === 'min' && (
                           <p role='alert'>Enter a valid price</p>
                        )}
                     </div>

                     <div className='w-full lg:w-6/12'>
                        <input
                           type='number'
                           name='product_status'
                           id=''
                           className='px-3 py-4 w-full rounded-md border border-gray-304'
                           placeholder='Product Status'
                           required
                           {...register('product_status', {
                              required: true,
                              min: 1,
                           })}
                        />
                        {errors.product_status?.type === 'min' && (
                           <p role='alert'>Enter a valid number</p>
                        )}
                     </div>
                  </div>

                  <div className='w-full sm:w-10/12 md:w-8/12 lg:w-6/12 m-auto'>
                     <textarea
                        name='product_detail'
                        id=''
                        rows='8'
                        className='px-3 py-4 w-full rounded-md border border-gray-304'
                        placeholder='Product Detail'
                        required
                        {...register('product_detail', {
                           required: true,
                           maxLength: 1000,
                        })}
                     />
                     {errors.product_detail?.type === 'maxLength' && (
                        <p role='alert'>Maximum 500 character is allowed</p>
                     )}
                  </div>

                  <div className='w-full sm:w-10/12 md:w-8/12 lg:w-6/12 m-auto'>
                     {loading ? (
                        <h3 className='font-bold text-md md:text-lg'>
                           Please Wait...
                        </h3>
                     ) : (
                        <div>
                           {!error ? (
                              <input
                                 type='submit'
                                 className='py-4 w-full rounded-md bg-black text-white font-semibold text-lg hover:bg-[#1CB803] duration-150 cursor-pointer'
                                 value='PUBLISH'
                              />
                           ) : (
                              <input
                                 type='button'
                                 className='py-4 w-full rounded-md bg-red-500 text-white font-semibold text-lg hover:bg-[#1CB803] duration-150 cursor-pointer'
                                 value='RESET'
                                 onClick={handleResetForm}
                              />
                           )}
                        </div>
                     )}
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default UploadProduct;
