import { useContext } from 'react';
import { cartProductContext } from '../App.js';
import NavBar from '../Components/ReusePage/NavBar.jsx';
import TopHeader from '../Components/ReusePage/TopHeader.jsx';
import { authContext } from '../context/authContext.jsx';
import { FaUserAlt, FaTruck } from 'react-icons/fa';
import swal from 'sweetalert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Shiping = () => {
   const [cartProduct] = useContext(cartProductContext);
   const { user } = useContext(authContext);
   const navigate = useNavigate();
   const shippingInfo = {
      shippingCountry: 'bangladesh',
      payment: 'cash on delivery',
   };
   const { shippingCountry, payment } = shippingInfo;

   // calculation of total cart product
   const totalProductPrice = cartProduct.reduce((init, item) => {
      return init + item.product_price * item.quantity;
   }, 0);

   // total vat calculation
   const vatCalculation = (totalProductPrice * 10) / 100;
   const roundFigureVat = parseFloat(vatCalculation.toFixed(1));

   // calculate shipping charge
   const shippingCalculation = (price) => {
      if (price < 1000) {
         return 50;
      } else {
         return 0;
      }
   };

   // grand total
   const grandTotal = totalProductPrice + roundFigureVat;

   // handle place order
   const handlePlaceOrder = async (email) => {
      try {
         const order = await axios.delete(
            `https://shoe-store-api-ghgy.onrender.com/api/cart/order/${email}`
         );
         if (order.status === 200) {
            swal({
               title: 'Good Job',
               text: 'order place done',
               icon: 'success',
            });
            navigate('/', { replace: true });
         }
      } catch (error) {
         swal({
            title: error.message,
            icon: 'warning',
         });
      }
   };
   return (
      <div>
         <TopHeader />
         <NavBar />

         <div className='my-16 mx-8 sm:mx-12 md:mx-16 lg:mx-26 xl:mx-40 2xl:mx-56 space-y-10'>
            <div className='flex justify-between items-center bg-[#E5FEE9]'>
               <div className='flex justify-center items-center py-6 space-x-8 shadow-sm rounded-md md:w-6/12 lg:w-4/12'>
                  <FaUserAlt className='text-5xl' />
                  <div>
                     <h3 className='capitalize font-extrabold text-xl'>
                        customer
                     </h3>
                     <h3>Name: {user?.user_name}</h3>
                     <h3>Email: {user?.userEmail}</h3>
                  </div>
               </div>
               <div className='flex justify-center items-center py-6 space-x-8 shadow-sm rounded-md md:w-6/12 lg:w-4/12'>
                  <FaTruck className='text-5xl' />
                  <div>
                     <h3 className='capitalize font-extrabold text-xl'>
                        customer
                     </h3>
                     <h3>Shipping: {shippingCountry}</h3>
                     <h3>payment: {payment}</h3>
                  </div>
               </div>
            </div>

            <div className='lg:flex justify-between'>
               <div className='lg:w-8/12 grid gap-y-2 grid-cols-1'>
                  {/* card product map */}
                  {cartProduct.map((products) => {
                     return (
                        <div key={products._id}>
                           <div className='lg:flex justify-between items-center border border-b-1 rounded-sm p-6'>
                              <div>
                                 <img
                                    src={products.product_image}
                                    className='w-24 h-24'
                                    alt=''
                                 />
                              </div>
                              <h3 className='capitalize text-base font-semibold m-0'>
                                 {products.product_title}
                              </h3>
                              <div className='space-y-2 flex flex-col items-center'>
                                 <span>Quantity</span>
                                 <span>{products.quantity}</span>
                              </div>

                              <div className='space-y-2'>
                                 <span className='block'>SubTotal</span>
                                 <span className='block'>
                                    ${' '}
                                    {products.product_price * products.quantity}{' '}
                                 </span>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>

               {/* total price section */}
               <div className='lg:w-3/12 space-y-6'>
                  <table className='w-full border border-1 border-stone-300'>
                     <tbody>
                        <tr>
                           <td className='border border-1 p-2 font-semibold'>
                              Total
                           </td>
                           <td className='border border-1 p-2'>
                              ${totalProductPrice}
                           </td>
                        </tr>
                        <tr>
                           <td className='border border-1 p-2 font-semibold'>
                              Vat
                           </td>
                           <td className='border border-1 p-2'>
                              ${roundFigureVat}
                           </td>
                        </tr>
                        <tr>
                           <td className='border border-1 p-2 font-semibold'>
                              Shipping
                           </td>
                           <td className='border border-1 p-2'>
                              ${shippingCalculation(totalProductPrice)}
                           </td>
                        </tr>
                        <tr>
                           <td className='border border-1 p-2 font-semibold'>
                              Grand Total
                           </td>
                           <td className='border border-1 p-2'>
                              ${grandTotal}
                           </td>
                        </tr>
                     </tbody>
                  </table>

                  {/* continue and checkout button */}
                  <div className='space-y-4'>
                     <button
                        onClick={() => handlePlaceOrder(user?.userEmail)}
                        className='w-full font-semibold bg-black p-4 text-white rounded-md text-center'>
                        Confirm
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Shiping;
