import axios from 'axios';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import NavBar from '../Components/ReusePage/NavBar.jsx';
import TopHeader from '../Components/ReusePage/TopHeader.jsx';
import { authContext } from '../context/authContext.jsx';

const Register = () => {
   const [isLoading, setIsLoading] = useState(null);
   const navigate = useNavigate();
   const { dispatch } = useContext(authContext);
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm();

   const onSubmit = async (data) => {
      const { user_name, mobile, email, password } = data;
      setIsLoading(true);
      try {
         const register = await axios.post(
            'http://localhost:2000/api/user/register',
            {
               user_name,
               mobile,
               email,
               password,
               isAdmin: false,
            }
         );

         if (register.status === 201) {
            swal({
               title: `welcome ${register.data?.user_name}`,
               text: 'SignUp successful',
               icon: 'success',
               button: 'Ok',
            });
            localStorage.setItem('user', JSON.stringify(register.data));
            dispatch({ type: 'REGISTER', payload: register.data });
            reset();
            setIsLoading(false);
            navigate('/', { replace: true });
         }
      } catch (error) {
         swal({
            title: 'Sorry!',
            text: error.register.data.error,
            icon: 'warning',
            button: 'Ok',
         });
         setIsLoading(false);
         console.log(error)
      }
   };

   return (
      <div>
         <TopHeader />
         <NavBar />
         <div className='flex justify-center items-center mt-32 mx-8 sm:mx-12 md:mx-16 lg:mx-32 xl:mx-40 2xl:mx-56'>
            <div className='space-y-8 shadow-md px-8 py-14 border border-gray-200 rounded-md w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12'>
               <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                  <div className='w-full'>
                     <input
                        type='text'
                        name='user_name'
                        className='px-3 py-4 w-full rounded-md border border-gray-304'
                        placeholder='UserName'
                        {...register('user_name', {
                           required: true,
                           maxLength: 16,
                        })}
                     />
                     {errors.user_name?.type === 'maxLength' && (
                        <p role='alert' className='text-red-600'>
                           Maximum 16 character is allowed
                        </p>
                     )}
                  </div>
                  <div className='w-full'>
                     <input
                        type='number'
                        name='mobile'
                        className='px-3 py-4 w-full rounded-md border border-gray-304'
                        placeholder='Mobile'
                        {...register('mobile', {
                           required: true,
                           maxLength: 11,
                           minLength: 11,
                        })}
                     />
                     {errors.mobile?.type === 'maxLength' && (
                        <p role='alert' className='text-red-600'>
                           mobile must be 11 character
                        </p>
                     )}
                     {errors.mobile?.type === 'maxLength' ||
                        (errors.mobile?.type === 'minLength' && (
                           <p role='alert' className='text-red-600'>
                              mobile must be 11 character
                           </p>
                        ))}
                  </div>
                  <div className='w-full'>
                     <input
                        type='email'
                        name='email'
                        className='px-3 py-4 w-full rounded-md border border-gray-304'
                        placeholder='Email'
                        {...register('email', {
                           required: true,
                           pattern:
                              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        })}
                     />
                     {errors.email?.type === 'pattern' && (
                        <p role='alert' className='text-red-600'>
                           Write a valid email
                        </p>
                     )}
                  </div>

                  <div className='w-full'>
                     <input
                        type='password'
                        name='password'
                        className='px-3 py-4 w-full rounded-md border border-gray-304'
                        placeholder='Password'
                        {...register('password', {
                           required: true,
                           maxLength: 16,
                           minLength: 6,
                        })}
                     />
                     {errors.password?.type === 'maxLength' && (
                        <p role='alert' className='text-red-600'>
                           maximum 16 character is allowed
                        </p>
                     )}
                     {errors.password?.type === 'minLength' && (
                        <p role='alert' className='text-red-600'>
                           minimum 6 character is allowed
                        </p>
                     )}
                  </div>

                  <div>
                     <input
                        type='submit'
                        className='py-4 w-full rounded-md bg-[#1CB803] text-white font-semibold text-lg hover:bg-black duration-150 cursor-pointer'
                        value={isLoading ? 'WAIT...' : 'REGISTER'}
                        disabled={isLoading}
                     />
                  </div>
               </form>

               <div className='flex justify-center items-center space-x-3'>
                  <p className='capitalize font-semibold'>
                     all ready have an account?
                  </p>
                  <Link
                     to='/user/login'
                     className='font-semibold text-[#1CB803]'>
                     Login
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Register;
