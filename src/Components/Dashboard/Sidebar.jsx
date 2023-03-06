import logo from '../../images/logo/logo.png';
import { FaChartBar, FaClipboardList, FaUpload, FaBars } from 'react-icons/fa';
import {
   AiOutlineOrderedList,
   AiOutlineClose,
} from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = () => {
   const [close, setClose] = useState(false);

   return (
      <div
         className={
            close
               ? 'md:min-h-screen md:w-[60px] shadow-md bg-white  transition-all'
               : 'md:min-h-screen md:w-[280px] shadow-md bg-white  transition-all'
         }>
         <div>
            <div className='flex justify-between items-center mx-4 mt-4'>
               {!close && (
                  <Link to='/'>
                     <img src={logo} className='w-20 lg:w-24' alt='' />
                  </Link>
               )}
               <div>
                  {close ? (
                     <FaBars
                        onClick={() => setClose(!close)}
                        className={
                           !close
                              ? 'text-2xl text-[#1CB803] cursor-pointer'
                              : 'text-2xl text-[#1CB803] cursor-pointer mt-4'
                        }
                     />
                  ) : (
                     <AiOutlineClose
                        onClick={() => setClose(!close)}
                        className={
                           !close
                              ? 'text-3xl text-[#1CB803] cursor-pointer'
                              : 'text-3xl text-[#1CB803] cursor-pointer mt-6'
                        }
                     />
                  )}
               </div>
            </div>

            {/* dashboard link */}
            <div className='mt-12'>
               <NavLink
                  to='dashboard-status'
                  className={({ isActive }) =>
                     isActive
                        ? 'flex items-center space-x-3 my-2 py-3 px-4 bg-slate-700 text-white hover:bg-slate-700 hover:text-white duration-150'
                        : 'flex items-center space-x-3 my-2 py-3 px-4 hover:bg-slate-700 hover:text-white duration-150'
                  }>
                  <FaChartBar className='text-lg text-[#1CB803]' />
                  <span
                     className={
                        close ? 'font-semibold hidden' : 'font-semibold'
                     }>
                     Dashboard
                  </span>
               </NavLink>

               <NavLink
                  to='product-list'
                  className={({ isActive }) =>
                     isActive
                        ? 'flex items-center space-x-3 my-2 py-3 px-4 bg-slate-700 text-white hover:bg-slate-700 hover:text-white duration-150'
                        : 'flex items-center space-x-3 my-2 py-3 px-4 hover:bg-slate-700 hover:text-white duration-150'
                  }>
                  <FaClipboardList className='text-xl text-[#1CB803]' />
                  <span
                     className={
                        close ? 'font-semibold hidden' : 'font-semibold'
                     }>
                     Products List
                  </span>
               </NavLink>

               <NavLink
                  to='upload-product'
                  className={({ isActive }) =>
                     isActive
                        ? 'flex items-center space-x-3 my-2 py-3 px-4 bg-slate-700 text-white hover:bg-slate-700 hover:text-white duration-150'
                        : 'flex items-center space-x-3 my-2 py-3 px-4 hover:bg-slate-700 hover:text-white duration-150'
                  }>
                  <FaUpload className='text-xl text-[#1CB803]' />
                  <span
                     className={
                        close ? 'font-semibold hidden' : 'font-semibold'
                     }>
                     Upload Products
                  </span>
               </NavLink>

               <NavLink
                  to='order-list'
                  className={({ isActive }) =>
                     isActive
                        ? 'flex items-center space-x-3 my-2 py-3 px-4 bg-slate-700 text-white hover:bg-slate-700 hover:text-white duration-150'
                        : 'flex items-center space-x-3 my-2 py-3 px-4 hover:bg-slate-700 hover:text-white duration-150'
                  }>
                  <AiOutlineOrderedList className='text-xl text-[#1CB803]' />
                  <span
                     className={
                        close ? 'font-semibold hidden' : 'font-semibold'
                     }>
                     Order List
                  </span>
               </NavLink>
            </div>
         </div>
      </div>
   );
};

export default Sidebar;
