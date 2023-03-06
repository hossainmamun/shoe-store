import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

const EditProduct = () => {
   const { productId } = useParams();
   const navigate = useNavigate();
   const [product, setProduct] = useState([]);
   const [isUploadImg, setIsUploadImg] = useState(false);
   const [loading, setLoading] = useState(null);
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);
   const [imgUrl, setImgUrl] = useState(null);
   const [preLoading, setPreLoading] = useState(null);

   // load existing product data
   const loadExistingData = async () => {
      setPreLoading(true);

      try {
         const response = await axios.get(
            `http://localhost:2000/api/products/${productId}`
         );
         if (response.status === 200) {
            setProduct(response.data);
            setPreLoading(false);
         }
      } catch (error) {
         swal({
            title: error.response.statusText,
            text: error.message,
            icon: 'warning',
         });
      }
   };
   // useEffect
   useEffect(() => {
      loadExistingData();
   }, []);

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
      } catch (error) {
         setLoading(false);
         setError(true);
         setSuccess(false);
      }
   };

   // edit product
   const handleEditProduct = (e) => {
      const newProductInfo = { ...product };
      newProductInfo[e.target.name] = e.target.value;
      setProduct(newProductInfo);
   };

   // update product data
   const handleUpdateProduct = async (e) => {
      e.preventDefault();

      try {
         const response = await axios.patch(
            `http://localhost:2000/api/products/${productId}`,
            {
               product_image: imgUrl ? imgUrl : product.product_image,
               product_title: product.product_title,
               product_price: product.product_price,
               product_status: product.product_status,
               product_detail: product.product_detail,
            }
         );
         if (response.status === 200) {
            swal({
               title: 'Good job!',
               text: 'Product update successfully',
               icon: 'success',
            });
         }
         navigate('/dashboard/product-list', { replace: true });
      } catch (error) {
         swal({
            title: error.response.statusText,
            text: error.message,
            icon: 'warning',
         });
      }
   };

   return (
      <div className='w-full flex justify-center lg:px-8 xl:px-14'>
         {preLoading ? (
            <div className='flex justify-center items-center mt-16'>
               <div role='status'>
                  <svg
                     aria-hidden='true'
                     className='w-10 h-10 m-auto text-gray-300 animate-spin dark:text-gray-600 fill-[#1CB803]'
                     viewBox='0 0 100 101'
                     fill='none'
                     xmlns='http://www.w3.org/2000/svg'>
                     <path
                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                        fill='currentColor'
                     />
                     <path
                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                        fill='currentFill'
                     />
                  </svg>
                  <span className='mt-3 block font-semibold'>Loading...</span>
               </div>
            </div>
         ) : (
            <div className='space-y-8 w-full text-center'>
               <h3 className='capitalize font-bold text-xl md:text-2xl mt-16'>
                  update product
               </h3>
               {/* form start */}
               <div className='px-6 md:px-0 pb-10 md:pb-0'>
                  <form onSubmit={handleUpdateProduct} className='space-y-5'>
                     <div className='lg:flex justify-between items-center w-full sm:w-10/12 md:w-8/12 lg:w-6/12 m-auto space-y-5 lg:space-y-0 lg:space-x-3'>
                        {!isUploadImg ? (
                           <div className='w-full lg:w-6/12'>
                              <input
                                 type='text'
                                 name='product_price'
                                 id=''
                                 value={product?.product_image || ''}
                                 onChange={handleEditProduct}
                                 className='px-3 py-4 w-full rounded-md border border-gray-304'
                                 placeholder='image url'
                                 required
                                 readOnly
                              />
                           </div>
                        ) : (
                           <div className='w-full lg:w-6/12'>
                              <input
                                 type='file'
                                 name='product_status'
                                 id=''
                                 onChange={handleImageUpload}
                                 className='px-3 py-4 w-full rounded-md border border-gray-304'
                                 placeholder='Product Status'
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
                        )}
                        <div className='w-full sm:w-10/12 md:w-8/12 lg:w-6/12 m-auto'>
                           <input
                              type='button'
                              onClick={() => setIsUploadImg(!isUploadImg)}
                              className='py-4 w-full rounded-md bg-[#1CB803] text-white font-semibold text-lg hover:bg-black duration-150 cursor-pointer'
                              value={
                                 isUploadImg
                                    ? 'Existing Image'
                                    : 'Upload New Image'
                              }
                           />
                        </div>
                     </div>

                     <div className='w-full sm:w-10/12 md:w-8/12 lg:w-6/12 m-auto'>
                        <input
                           type='text'
                           name='product_title'
                           id=''
                           value={product?.product_title || ''}
                           onChange={handleEditProduct}
                           className='px-3 py-4 w-full rounded-md border border-gray-304'
                           placeholder='Product Title'
                           required
                        />
                     </div>

                     <div className='lg:flex justify-between items-center w-full sm:w-10/12 md:w-8/12 lg:w-6/12 m-auto space-y-5 lg:space-y-0 lg:space-x-3'>
                        <div className='w-full lg:w-6/12'>
                           <input
                              type='number'
                              name='product_price'
                              id=''
                              value={product?.product_price || ''}
                              onChange={handleEditProduct}
                              className='px-3 py-4 w-full rounded-md border border-gray-304'
                              placeholder='Product Price'
                              required
                           />
                        </div>

                        <div className='w-full lg:w-6/12'>
                           <input
                              type='number'
                              name='product_status'
                              id=''
                              value={product?.product_status || ''}
                              onChange={handleEditProduct}
                              className='px-3 py-4 w-full rounded-md border border-gray-304'
                              placeholder='Product Status'
                              required
                           />
                        </div>
                     </div>

                     <div className='w-full sm:w-10/12 md:w-8/12 lg:w-6/12 m-auto'>
                        <textarea
                           name='product_detail'
                           id=''
                           value={product?.product_detail || ''}
                           onChange={handleEditProduct}
                           rows='8'
                           className='px-3 py-4 w-full rounded-md border border-gray-304'
                           placeholder='Product Detail'
                           required
                        />
                     </div>

                     <div className='w-full sm:w-10/12 md:w-8/12 lg:w-6/12 m-auto'>
                        {loading ? (
                           <h3 className='font-bold text-md md:text-lg'>
                              Please Wait...
                           </h3>
                        ) : (
                           <input
                              type='submit'
                              className='py-4 w-full rounded-md bg-black text-white font-semibold text-lg hover:bg-[#1CB803] duration-150 cursor-pointer'
                              value='UPDATE'
                           />
                        )}
                     </div>
                  </form>
               </div>
            </div>
         )}
      </div>
   );
};

export default EditProduct;
