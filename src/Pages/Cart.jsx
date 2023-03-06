import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import NavBar from '../Components/ReusePage/NavBar.jsx';
import TopHeader from '../Components/ReusePage/TopHeader.jsx';
import { authContext } from '../context/authContext.jsx';
import { AiFillCloseSquare } from 'react-icons/ai';
import { cartProductContext } from '../App.js';

const Cart = () => {
   const { user } = useContext(authContext);
   const [cartProduct, setCartProduct] = useContext(cartProductContext);
   const [isLoading, setIsLoading] = useState(false);

   // load cart product
   const getCartProduct = async () => {
      setIsLoading(true);
      try {
         const products = await axios.get('http://localhost:2000/api/cart/');
         if (products.status === 200) {
            const filterProduct = products.data.filter(
               (item) => item.userEmail === user?.userEmail
            );
            setCartProduct(filterProduct);
            setIsLoading(false);
         }
      } catch (error) {
         swal({
            title: error.message,
            icon: 'warning',
         });
      }
   };

   useEffect(() => {
      getCartProduct();
   }, [user]);

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

   // delete cart product
   const handleDeleteCart = async (id) => {
      try {
         const product = await axios.delete(
            `http://localhost:2000/api/cart/${id}`
         );
         if (product.status === 200) {
            swal({
               title: 'Good Job',
               text: 'Cart Delete Successfully',
               icon: 'success',
            });
         }
         getCartProduct();
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

         {cartProduct.length === 0 && isLoading ? (
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
            <div className='my-16 mx-8 sm:mx-12 md:mx-16 lg:mx-26 xl:mx-40 2xl:mx-56 space-y-6'>
               {/* total cart product */}
               {cartProduct.length === 0 ? (
                  <div className='border border-1 bg-green-100 p-3 text-center rounded-md'>
                     <h3 className='capitalize font-bold text-base md:text-lg'>
                        there is no product in this cart
                     </h3>
                  </div>
               ) : (
                  <div className='space-y-8'>
                     <div className='border border-1 bg-green-100 p-3 text-center rounded-md'>
                        <h3 className='capitalize font-bold text-base md:text-lg'>
                           total cart products:{cartProduct.length}
                        </h3>
                     </div>
                     <div className='lg:flex justify-between'>
                        <div className='lg:w-6/12 grid gap-y-8 grid-cols-1'>
                           {/* card product map */}
                           {cartProduct.map((products) => {
                              return (
                                 <div key={products._id}>
                                    <div
                                       onClick={() =>
                                          handleDeleteCart(products._id)
                                       }
                                       className='flex justify-start text-red-600 text-2xl cursor-pointer absolute'>
                                       <AiFillCloseSquare />
                                    </div>
                                    <div className='lg:flex justify-between items-center shadow-lg border border-1 rounded-md p-6'>
                                       <div className='space-y-4'>
                                          <h3 className='capitalize text-lg md:text-xl font-extrabold m-0'>
                                             {products.product_title}
                                          </h3>
                                          <div className='lg:w-60 lg:h-40 bg-[#e3f5eb] flex justify-center items-center'>
                                             <img
                                                src={products.product_image}
                                                className='lg:w-60 lg:h-40'
                                                alt=''
                                             />
                                          </div>
                                       </div>

                                       <div className='space-y-3'>
                                          <div className='flex justify-between items-center space-x-3'>
                                             <strong>Quantity</strong>

                                             <select
                                                name=''
                                                id=''
                                                className='px-4 py-1 rounded-sm bg-gray-200'>
                                                <option
                                                   value={products.quantity}>
                                                   {products.quantity}
                                                </option>
                                                <option value='1'>1</option>
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

                                          <div className='flex justify-between items-center space-x-3'>
                                             <strong>Price</strong>
                                             <span className='block'>
                                                $ {products.product_price}
                                             </span>
                                          </div>
                                          <hr />

                                          <div className='flex justify-between items-center space-x-3'>
                                             <strong>Total</strong>
                                             <span className='block'>
                                                ${' '}
                                                {products.product_price *
                                                   products.quantity}{' '}
                                             </span>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              );
                           })}
                        </div>

                        {/* total price section */}
                        <div className='lg:w-5/12 space-y-6'>
                           <div className='h-48 shadow-lg border border-1 rounded-md p-6 space-y-4'>
                              <h3>Total: ${totalProductPrice}</h3>
                              <h3>Vat: ${roundFigureVat}</h3>
                              <h3>
                                 Shipping: $
                                 {shippingCalculation(totalProductPrice)}
                              </h3>
                              <h3>Grand Total: ${grandTotal}</h3>
                           </div>

                           {/* continue and checkout button */}
                           <div className='space-y-4'>
                              <Link
                                 to='/shipping'
                                 className='block font-semibold bg-black p-4 text-white rounded-md text-center'>
                                 Place order
                              </Link>
                              <Link
                                 to='/'
                                 className='block font-semibold bg-[#1CB803] p-4 text-white rounded-md text-center'>
                                 Continue To Shopping
                              </Link>
                           </div>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         )}
      </div>
   );
};

export default Cart;
