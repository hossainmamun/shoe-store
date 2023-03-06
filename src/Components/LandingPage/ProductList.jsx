import { Link } from 'react-router-dom';
import { FaStarHalfAlt } from 'react-icons/fa';
import axios from 'axios';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';

const ProductList = () => {
   const [productList, setProductList] = useState([]);
   const [searchProduct, setSearchProduct] = useState('');

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

   // search products
   const filterProduct = productList.filter((item) => {
      if (searchProduct === '') {
         return item;
      } else if (
         item.product_title.toLowerCase().includes(searchProduct.toLowerCase())
      ) {
         return item;
      }
      return null;
   });

   return (
      <div className='my-10'>
         {productList.length === 0 ? (
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
            <div className='mx-8 sm:mx-12 md:mx-16 lg:mx-32 xl:mx-40 2xl:mx-56 space-y-10'>
               <div className='lg:w-6/12 m-auto'>
                  <input
                     type='search'
                     name=''
                     onChange={(e) => setSearchProduct(e.target.value)}
                     className='px-4 py-3 border border-gray-400 rounded-md w-full'
                     placeholder='Search Products...'
                  />
               </div>

               {filterProduct.length === 0 ? (
                  <h1 className='text-center capitalize text-red-600 text-xl'>
                     no product found
                  </h1>
               ) : (
                  <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                     {filterProduct.map((product) => {
                        const {
                           _id,
                           product_image,
                           product_title,
                           product_review,
                           product_price,
                        } = product;
                        return (
                           <div
                              className='border shadow-sm p-4 rounded-md'
                              key={_id}>
                              <div className='space-y-4'>
                                 <div className='bg-[#e3f5eb] rounded-md'>
                                    <Link to={`/product/${_id}`}>
                                       <img
                                          src={product_image}
                                          className='lg:h-[200px] w-full object-fill'
                                          alt=''
                                       />
                                    </Link>
                                 </div>
                                 <Link
                                    to={`/product/${_id}`}
                                    className='block hover:text-[#1CB803] duration-150'>
                                    <h3 className='capitalize font-semibold text-base md:text-lg'>
                                       {product_title}
                                    </h3>
                                 </Link>
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

                                 <span className='block font-bold'>
                                    Price: {product_price}
                                 </span>
                              </div>
                           </div>
                        );
                     })}
                  </div>
               )}
            </div>
         )}
      </div>
   );
};

export default ProductList;
