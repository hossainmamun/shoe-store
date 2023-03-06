const DashboardIndex = () => {
   const cardArray = [1, 2, 3, 4];
   const orders = [1, 2, 3, 4, 5];
   return (
      <div>
         <div className='mx-6 md:mx-8 lg:mx-10 xl:mx-12 my-8'>
            <div className='grid gap-6 md:grid-cols-3 lg:grid-cols-4'>
               {cardArray.map((item, index) => {
                  return (
                     <div className='max-w-sm rounded overflow-hidden border border-1 shadow-sm'>
                        <div className='px-6 py-8'>
                           <div className='font-bold text-xl mb-2'>
                              Card Title
                           </div>
                           <p className='text-gray-700 text-base'>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit.
                           </p>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>

         {/* order table */}
         <div className='relative overflow-x-auto shadow-md sm:rounded-lg mx-6 md:mx-8 lg:mx-10 xl:mx-12 mt-8'>
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

export default DashboardIndex;
