import NavBar from '../Components/ReusePage/NavBar.jsx';
import TopHeader from '../Components/ReusePage/TopHeader.jsx';
import { FaUserAlt } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from '../context/authContext.jsx';

const UserProfile = () => {
   const { user } = useContext(authContext);
   return (
      <div>
         <TopHeader />
         <NavBar />
         <div className='md:flex justify-start md:space-x-4 lg:space-x-10 mx-8 sm:mx-12 md:mx-16 lg:mx-32 xl:mx-40 2xl:mx-56 my-16'>
            <div className='md:w-4/12 shadow-sm pt-6 rounded-md border border-1 space-y-8'>
               <div className='text-center space-y-4'>
                  <FaUserAlt className='m-auto text-[90px] border border-1 rounded-full text-[#1CB803] p-3 border-[#1CB803]' />
                  <div className='space-y-3'>
                     <h3 className='capitalize font-semibold text-base md:text-lg lg:text-xl'>
                        { user?.user_name}
                     </h3>
                     <h3 className='font-semibold text-base md:text-lg'>
                        Roll: {user?.isAdmin ? 'Admin': 'User'}
                     </h3>
                  </div>
               </div>
               <div>
                  <NavLink
                     to='setting'
                     className={({ isActive }) =>
                        isActive
                           ? 'block border-t py-4 capitalize text-center text-base lg:text-lg bg-slate-200'
                           : 'block border-t py-4 capitalize text-center text-base lg:text-lg'
                     }>
                     profile settings
                  </NavLink>
                  <NavLink
                     to='order-list'
                     className={({ isActive }) =>
                        isActive
                           ? 'block border-t py-4 capitalize text-center text-base lg:text-lg bg-slate-200'
                           : 'block border-t py-4 capitalize text-center text-base lg:text-lg'
                     }>
                     order list
                  </NavLink>
               </div>
            </div>

            {/* outlet  */}
            <div className='md:w-8/12'>
               <Outlet />
            </div>
         </div>
      </div>
   );
};

export default UserProfile;
