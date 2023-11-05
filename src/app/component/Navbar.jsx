import React, { useState } from 'react';
const Navbar = () => {
  

    return (
        <nav className='bg-white shadow-lg w-screen p-5'>
            <div className='items-center flex justify-start'>
                <div className='px-1 px-md-8'>
                    <a href="/">
                        <img src="../../../../public/logoyt.png" alt="" width={50} height={50} />
                    </a>
                </div>
                <div className='font-bold text-2xl text-red-500'>
                    <h1> React Movie </h1>
                </div>
               </div>
        </nav>
    );
};

export default Navbar;
