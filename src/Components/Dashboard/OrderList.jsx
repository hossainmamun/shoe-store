const OrderList = () => {
   const orders = [1, 2, 3, 4, 5];

   return (
      <div className='w-full'>
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
               <h3 className='capitalize font-semibold'>total orders: 00</h3>
            </div>
         </div>

         {/* order table */}
         <div className='relative overflow-x-auto shadow-md sm:rounded-lg mx-6 sm:mx-8 md:mx-10 mt-8'>
            <table className="w-full text-sm text-left text-gray-700 font-['Poppins']">
               <thead className='text-xs text-white uppercase bg-slate-700'>
                  <tr>
                     <th scope='col' className='px-6 py-3'>
                        ID
                     </th>
                     <th scope='col' className='px-6 py-3'>
                        PRODUCT NAME
                     </th>
                     <th scope='col' className='px-6 py-3'>
                        CUSTOMER NAME
                     </th>
                     <th scope='col' className='px-6 py-3'>
                        PHONE
                     </th>
                     <th scope='col' className='px-6 py-3'>
                        EMAIL
                     </th>
                     <th scope='col' className='px-6 py-3'>
                        ADDRESS
                     </th>
                     <th scope='col' className='px-6 py-3'>
                        QUANTITY
                     </th>
                     <th scope='col' className='px-6 py-3'>
                        TOTAL
                     </th>
                     <th scope='col' className='px-6 py-3'>
                        STATUS
                     </th>
                     <th scope='col' className='px-6 py-3'>
                        DATE
                     </th>
                     <th scope='col-2' className='px-6 py-3'>
                        <span>ACTION</span>
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {orders.map((items, index) => {
                     return (
                        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                           <th
                              scope='row'
                              className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                              {index + 1}
                           </th>
                           <td className='px-6 py-4'>nike-100 legend</td>
                           <td className='px-6 py-4'>mamun hossain</td>
                           <td className='px-6 py-4'>01623542145</td>
                           <td className='px-6 py-4'>hmamun492@gmail.com</td>
                           <td className='px-6 py-4'>01623542145</td>
                           <td className='px-6 py-4'>
                              hold-12, boro dewra, tongi, gazipur
                           </td>
                           <td className='px-6 py-4'>$124</td>
                           <td className='px-6 py-4'>shipped</td>
                           <td className='px-6 py-4'>10-10-2022</td>
                           <td className='relative'>
                              <button className='bg-red-600 text-white absolute top-0 left-0 w-full h-full hover:bg-red-700'>
                                 Cancel
                              </button>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default OrderList;
