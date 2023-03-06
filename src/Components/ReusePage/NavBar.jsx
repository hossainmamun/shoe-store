import { Link } from 'react-router-dom';
import logo from '../../images/logo/logo.png';
import { FaShoppingCart } from 'react-icons/fa';
import { MdArrowDropDown } from 'react-icons/md';
import { useContext, useState } from 'react';
import { authContext } from '../../context/authContext.jsx';
import { cartProductContext } from '../../App.js';

const NavBar = () => {
   const [open, setOpen] = useState(false);
   const { user, dispatch } = useContext(authContext);
   const [cartProduct] = useContext(cartProductContext);
   const logout = () => {
      localStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
   };

   return (
      <div className='py-3 sticky'>
         <div className='flex justify-between items-center mx-8 sm:mx-12 md:mx-16 lg:mx-32 xl:mx-40 2xl:mx-56'>
            <div className='w-3/12'>
               <Link to='/'>
                  <img src={logo} className='w-[106px] h-[63px]' alt='' />
               </Link>
            </div>

            <div className='w-3/12'>
               <div className='flex justify-end items-center space-x-6'>
                  {!user ? (
                     <>
                        <Link
                           to='/user/register'
                           className='no-underline uppercase text-base font-semibold'>
                           register
                        </Link>

                        <Link
                           to='/user/login'
                           className='no-underline uppercase text-base font-semibold'>
                           login
                        </Link>
                     </>
                  ) : (
                     <div>
                        <div
                           onClick={() => setOpen(!open)}
                           className='flex justify-start items-center cursor-pointer relative border border-[#1CB803] px-4 py-1 rounded-sm'>
                           <button className='no-underline capitalize text-base font-semibold text-[#1CB803]'>
                              {user.user_name}
                           </button>
                           <MdArrowDropDown className='text-2xl text-[#1CB803]' />
                        </div>

                        {open && (
                           <div className='shadow-md absolute w-[149px] bg-black rounded-sm'>
                              <div>
                                 <Link
                                    to='/user-profile'
                                    className='no-underline text-base text-white font-semibold block hover:bg-[#1CB803] px-4 py-1'>
                                    Profile
                                 </Link>
                                 {user.isAdmin === true && (
                                    <Link
                                       to='/dashboard'
                                       className='no-underline text-base text-white font-semibold block hover:bg-[#1CB803] px-4 py-1'>
                                       Dashboard
                                    </Link>
                                 )}
                              </div>

                              <button
                                 onClick={() => logout()}
                                 className='text-base text-white font-semibold w-full text-start hover:bg-[#1CB803] px-4 py-1'>
                                 Logout
                              </button>
                           </div>
                        )}
                     </div>
                  )}

                  <Link
                     to='/cart'
                     className='flex justify-between items-start space-x-1'>
                     <FaShoppingCart className='text-red-600' />
                     <h3 className='text-red-600 font-extrabold text-xl mt-[-10px]'>
                        {cartProduct.length}
                     </h3>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default NavBar;
