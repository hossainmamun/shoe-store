import { FaEdit, FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { GrCircleAlert } from 'react-icons/gr';
import { Link } from 'react-router-dom';

const ProductList = () => {
   const [productList, setProductList] = useState([]);
   const [isConfirmOpen, setIsConfirmOpen] = useState(false);
   const [selectedItem, setSelectedItem] = useState(null);

   // load all products
   const allProducts = async () => {
      try {
         const products = await axios.get('http://localhost:2000/api/products');
         if (products.status === 200) {
            setProductList(products.data);
         }
      } catch (error) {
         swal({
            title: error.products.statusText,
            text: error.message,
            icon: 'warning',
         });
      }
   };
   useEffect(() => {
      allProducts();
   }, []);

   // ! ***** DELETE FUNCTIONALITY START *****
   // open modal
   const handleOpen = (id) => {
      setSelectedItem(id);
      setIsConfirmOpen(true);
   };
   // close modal
   const handleClose = () => {
      setIsConfirmOpen(false);
      setSelectedItem(null);
   };
   // delete product
   const handleProductDelete = async () => {
      try {
         const deleteItem = await axios.delete(
            `http://localhost:2000/api/products/${selectedItem}`
         );
         if (deleteItem.status === 200) {
            setIsConfirmOpen(false);
            allProducts();
         }
      } catch (error) {
         swal({
            title: error.deleteItem.statusText,
            text: error.message,
            icon: 'warning',
         });
      }
   };
   // ! ***** DELETE FUNCTIONALITY END *****

   return (
      <div className='w-full relative'>
         <div className='md:flex justify-between items-center mx-6 sm:mx-8 md:mx-10 mt-8'>
            <div className='w-5/12 flex'>
               <input
                  type='search'
                  name=''
                  id=''
                  className='px-4 py-3 border border-gray-400 rounded-l-md w-full'
                  placeholder='Search Product'
               />
               <button className='bg-black px-6 text-white rounded-r-md hover:bg-[#1CB803] duration-200'>
                  Search
               </button>
            </div>

            <div>
               <h3 className='capitalize font-semibold'>
                  total products: {productList?.length}
               </h3>
            </div>
         </div>

         {productList.length === 0 ? (
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
            <div className='overflow-x-auto relative shadow-md sm:rounded-lg mx-6 sm:mx-8 md:mx-10 mt-8'>
               <table className="w-full text-left text-gray-700 font-['Poppins']">
                  <thead className='text-base text-white uppercase bg-slate-700'>
                     <tr className='text-center'>
                        <th scope='col' className='px-6 py-3 border border-1'>
                           ID
                        </th>
                        <th scope='col' className='px-6 py-3 border border-1'>
                           TITLE
                        </th>
                        <th scope='col' className='px-6 py-3 border border-1'>
                           DETAIL
                        </th>
                        <th
                           scope='col'
                           className='px-6 py-3 relative border border-1'>
                           IMAGE
                        </th>
                        <th scope='col' className='px-6 py-3 border border-1'>
                           PRICE
                        </th>
                        <th scope='col' className='px-6 py-3 border border-1'>
                           STATUS
                        </th>
                        <th colSpan='2' className='px-6 py-3 border border-1'>
                           <span>ACTION</span>
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {productList.map((product, index) => {
                        const {
                           _id,
                           product_image,
                           product_title,
                           product_price,
                           product_detail,
                           product_status,
                        } = product;
                        return (
                           <tr
                              key={_id}
                              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                              <th
                                 scope='row'
                                 className='px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white border border-1'>
                                 {index + 1}
                              </th>
                              <td className='px-2 py-2 border border-1'>
                                 {product_title}
                              </td>
                              <td className='px-2 py-2 text-sm border border-1'>
                                 {product_detail}
                              </td>
                              <td className='bg-[#e3f5eb] w-28 py-1 border border-1'>
                                 <img
                                    src={product_image}
                                    className='w-28'
                                    alt=''
                                 />
                              </td>
                              <td className='px-2 py-2 text-center border border-1'>
                                 {product_price}
                              </td>
                              <td className='px-2 py-2 text-center border border-1'>
                                 {product_status}
                              </td>
                              <td className='px-2 py-2 text-center bg-[#3a86ff] cursor-pointer hover:bg-[#386641] duration-150'>
                                 <Link
                                    to={`/dashboard/edit-product/${_id}`}
                                    className='block'>
                                    <FaEdit className='text-xl text-white m-auto' />
                                 </Link>
                              </td>

                              <td
                                 onClick={() => handleOpen(_id)}
                                 className='px-2 py-2 bg-[#e63946] cursor-pointer hover:bg-[#d62828] duration-150'>
                                 <FaTrash className='text-xl text-white m-auto' />
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
         )}

         {/* alert message */}
         {isConfirmOpen && (
            <div className='bg-white border border-1 shadow-xl p-8 rounded-md fixed overflow-hidden space-y-8 top-10 left-2/4'>
               <div className='space-y-3'>
                  <GrCircleAlert className='text-4xl text-red-600 m-auto' />
                  <p className='text-lg font-bold'>
                     Are you sure to delete this item!
                  </p>
               </div>
               <div className='flex justify-end space-x-4'>
                  <button
                     onClick={handleProductDelete}
                     className='border border-1 bg-red-600 px-4 py-2 text-white rounded-md font-semibold'>
                     Yes
                  </button>
                  <button
                     onClick={handleClose}
                     className='border border-1 bg-green-600 px-4 py-2 text-white rounded-md font-semibold'>
                     Cancel
                  </button>
               </div>
            </div>
         )}
      </div>
   );
};

export default ProductList;
