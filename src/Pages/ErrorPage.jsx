import React from 'react';

const ErrorPage = () => {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='text-center'>
          <p className='text-red-600 font-extrabold uppercase text-base sm:text-lg md:text-2xl'>sorry page not found</p>
          <p className='font-semibold text-lg'>404! try again later</p>
        </div>
      </div>
    );
};

export default ErrorPage;