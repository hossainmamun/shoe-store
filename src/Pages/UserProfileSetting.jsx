import { useContext } from "react";
import { authContext } from "../context/authContext.jsx";

const UserProfileSetting = () => {
   const {user} = useContext(authContext)
   return (
      <div className='space-y-6'>
         <div className='text-center'>
            <h3 className='capitalize m-auto font-semibold text-base md:text-lg lg:text-xl'>
               update user profile
            </h3>
         </div>

         <form action='' className='space-y-5'>
            <div className='md:flex justify-between items-center space-x-8'>
               <div className='w-full space-y-2'>
                  <label htmlFor='' className='font-semibold'>
                     User Name
                  </label>
                  <input
                     type='text'
                     name=''
                     value={user?.user_name || ''}
                     className='px-3 py-4 w-full rounded-md border border-gray-304'
                     placeholder='UserName'
                  />
               </div>
               <div className='w-full space-y-2'>
                  <label htmlFor='' className='font-semibold'>
                     Email Address
                  </label>
                  <input
                     type='email'
                     name=''
                     value={user?.userEmail || ''}
                     className='px-3 py-4 w-full rounded-md border border-gray-304'
                     placeholder='Email'
                  />
               </div>
            </div>

            <div className='md:flex justify-between items-center space-x-8'>
               <div className='w-full'>
                  <label htmlFor='' className='font-semibold'>
                     Password
                  </label>
                  <input
                     type='password'
                     name=''
                     className='px-3 py-4 w-full rounded-md border border-gray-304'
                     placeholder='Password'
                  />
               </div>
               <div className='w-full'>
                  <label htmlFor='' className='font-semibold'>
                     New Password
                  </label>
                  <input
                     type='password'
                     name=''
                     className='px-3 py-4 w-full rounded-md border border-gray-304'
                     placeholder='New Password'
                  />
               </div>
            </div>

            <div>
               <input
                  type='submit'
                  className='py-4 w-full rounded-md bg-[#1CB803] text-white font-semibold text-base hover:bg-black duration-150 cursor-pointer'
                  value='UPDATE PROFILE'
               />
            </div>
         </form>
      </div>
   );
};

export default UserProfileSetting;
