import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { authContext } from '../context/authContext.jsx';

const CustomerReview = ({ productId }) => {
   const [reviewList, setReviewList] = useState([]);
   const { user } = useContext(authContext);
   const [isLoading, setIsLoading] = useState(null);

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm();

   // review submit function
   const onSubmit = async (data) => {
      const { user_name } = user;
      const { rating, comment } = data;

      try {
         const review = await axios.post(
            'https://shoe-store-api-ghgy.onrender.com/api/review',
            {
               user_name,
               rating,
               comment,
               productId,
            }
         );
         if (review.status === 201) {
            swal({
               text: 'Thanks for your valuable review',
               icon: 'success',
            });
            reset();
            showReview();
         }
      } catch (error) {
         swal({
            title: error.product.statusText,
            text: error.message,
            icon: 'warning',
         });
      }
   };

   // show review by product id
   const showReview = async () => {
      setIsLoading(true);
      try {
         const review = await axios.get(
            `https://shoe-store-api-ghgy.onrender.com/api/review/${productId}`
         );
         if (review.status === 200) {
            setReviewList(review.data);
            setIsLoading(false);
         }
      } catch (error) {
         swal({
            title: error.product.statusText,
            text: error.message,
            icon: 'warning',
         });
      }
   };

   useEffect(() => {
      showReview();
   }, []);

   return (
      <div>
         <div className='md:flex justify-between items-start'>
            <div className='space-y-5 md:w-5/12'>
               <h3 className='capitalize font-bold'>write a customer review</h3>
               <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                  <p className='font-bold'>Rating</p>
                  <select
                     name='rating'
                     className='px-4 py-3 rounded-sm bg-gray-200 w-full'
                     {...register('rating', {
                        required: true,
                     })}>
                     <option defaultValue value='Fair'>
                        Fair
                     </option>
                     <option value='Poor'>Poor</option>
                     <option value='Good'>Good</option>
                     <option value='Excellent'>Excellent</option>
                  </select>
                  {errors.rating?.type === 'required' && (
                     <p role='alert'>Enter a valid rating</p>
                  )}

                  <p className='font-bold'>Comments</p>
                  <textarea
                     name='comment'
                     rows='5'
                     className='w-full bg-gray-200 rounded-sm'
                     {...register('comment', {
                        required: true,
                        maxLength: 100,
                     })}
                  />
                  {errors.comment?.type === 'maxLength' && (
                     <p role='alert' className='text-red-600'>
                        Maximum 100 character is allowed
                     </p>
                  )}

                  <input
                     type='submit'
                     className='bg-black py-4 block w-full cursor-pointer text-center text-white hover:bg-[#1CB803] duration-150 rounded-sm'
                     value='SUBMIT'
                  />
               </form>
            </div>
            <div className='md:w-5/12 space-y-4'>
               <p className='font-bold'>Reviews</p>
               {isLoading ? (
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
                        <span className='mt-3 block font-semibold'>
                           Loading...
                        </span>
                     </div>
                  </div>
               ) : (
                  <div>
                     {reviewList.map((item) => {
                        const { _id, user_name, rating, comment } = item;
                        return (
                           <div
                              key={_id}
                              className='space-y-2 shadow-md bg-gray-100 p-5 rounded-sm'>
                              <span className='block'>
                                 {new Date().toLocaleDateString()}
                              </span>
                              <span className='capitalize font-semibold block'>
                                 {user_name}
                              </span>
                              <span className='block'>Quality: {rating}</span>
                              <p>{comment}</p>
                           </div>
                        );
                     })}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default CustomerReview;
