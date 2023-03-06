import { Link, useParams } from 'react-router-dom';
import NavBar from '../Components/ReusePage/NavBar.jsx';
import TopHeader from '../Components/ReusePage/TopHeader.jsx';
import { FaStarHalfAlt } from 'react-icons/fa';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import swal from 'sweetalert';
import CustomerReview from './CustomerReview.jsx';
import { authContext } from '../context/authContext.jsx';

const ProductProfile = () => {
   const { productId } = useParams();
   const [product, setProduct] = useState([]);
   const [loading, setLoading] = useState(null);
   const [quantity, setQuantity] = useState(1);
   const { user } = useContext(authContext);

   // load existing product data
   const loadProductProfile = async () => {
      setLoading(true);

      try {
         const response = await axios.get(
            `http://localhost:2000/api/products/${productId}`
         );
         if (response.status === 200) {
            setProduct(response.data);
            setLoading(false);
         }
      } catch (error) {
         swal({
            title: error.message,
            text: error.message,
            icon: 'warning',
         });
      }
   };
   // useEffect
   useEffect(() => {
      loadProductProfile();
   }, []);

   // add to cart product
   const handleCartProduct = async () => {
      const { userEmail } = user;
      const { product_detail, product_image, product_title, product_price } =
         product;
      try {
         await axios.post('http://localhost:2000/api/cart', {
            product_title,
            product_image,
            product_price,
            product_detail,
            quantity,
            userEmail,
         });
      } catch (error) {
         swal({
            title: error.response.data.error,
            text: error.message,
            icon: 'warning',
         });
      }
   };

   const {
      product_image,
      product_title,
      product_detail,
      product_price,
      product_review,
      product_status,
   } = product;

   return (
      <div>
         <TopHeader />
         <NavBar />

         {loading ? (
            <div className='flex justify-center items-center'>
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
            <div>
               <div className='my-16 lg:flex justify-between mx-8 sm:mx-12 md:mx-16 lg:mx-26 xl:mx-40 2xl:mx-56'>
                  <div className='lg:w-5/12 bg-[#e3f5eb] flex items-center'>
                     <img src={product_image} alt='' />
                  </div>

                  <div className='lg:w-5/12 space-y-6'>
                     <h3 className='capitalize text-lg md:text-xl lg:text-2xl font-extrabold m-0'>
                        {product_title}
                     </h3>
                     <p className='text-base lg:text-lg'>{product_detail}</p>

                     <div className='w-8/12 border border-gray-200 rounded-md '>
                        <div className='flex justify-between items-center border-b-2 p-4'>
                           <span className='font-bold md:text-lg'>Price</span>
                           <span className='font-bold md:text-lg'>
                              {product_price}
                           </span>
                        </div>
                        <div className='flex justify-between items-center border-b-2 p-4'>
                           <span className='font-bold md:text-lg'>Status</span>
                           <span className='font-bold md:text-lg capitalize'>
                              {product_status}
                           </span>
                        </div>
                        <div className='flex justify-between items-center border-b-2 p-4'>
                           <span className='font-bold md:text-lg'>Review</span>
                           <p className='flex items-center space-x-3'>
                              <span className='flex space-x-1'>
                                 <FaStarHalfAlt />
                                 <FaStarHalfAlt />
                                 <FaStarHalfAlt />
                                 <FaStarHalfAlt />
                              </span>
                              <span className='capitalize font-semibold'>
                                 {product_review}
                              </span>
                           </p>
                        </div>

                        <div className='flex justify-between items-center border-b-2 px-4 py-3'>
                           <span className='font-bold md:text-lg'>
                              Quantity
                           </span>
                           <select
                              name=''
                              onChange={(e) => setQuantity(e.target.value)}
                              className='px-4 py-1 rounded-sm bg-gray-200'>
                              <option defaultValue value='1'>
                                 1
                              </option>
                              <option value='2'>2</option>
                              <option value='3'>3</option>
                              <option value='4'>4</option>
                              <option value='5'>5</option>
                              <option value='6'>6</option>
                              <option value='7'>7</option>
                              <option value='8'>8</option>
                              <option value='9'>9</option>
                              <option value='10'>10</option>
                           </select>
                        </div>

                        <div className='block'>
                           <Link
                              to={user ? '/cart' : '/user/login'}
                              onClick={user && handleCartProduct}
                              className='bg-black py-4 block text-center text-white hover:bg-[#1CB803] duration-150 rounded-sm'>
                              ADD TO CART
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
               {/* product review component */}
               {!user ? (
                  <div className='space-y-4 mb-16 mx-8 sm:mx-12 md:mx-16 lg:mx-26 xl:mx-40 2xl:mx-56'>
                     <h3 className='capitalize'>write a customer review</h3>
                     <div className='bg-green-200 p-4 md:w-6/12 rounded-sm'>
                        <p className='capitalize'>
                           please{' '}
                           <Link
                              to='/user/login'
                              className='font-bold text-orange-600'>
                              "Login"
                           </Link>{' '}
                           to write a review
                        </p>
                     </div>
                  </div>
               ) : (
                  <div className='mb-16 mx-8 sm:mx-12 md:mx-16 lg:mx-26 xl:mx-40 2xl:mx-56'>
                     <CustomerReview productId={productId} />
                  </div>
               )}
            </div>
         )}
      </div>
   );
};

export default ProductProfile;
