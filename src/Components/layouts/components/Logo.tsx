import React from 'react';

const Logo: React.FC = () => {
    return(
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" loading='lazy'/>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Prueba tca.</span>
        </a>
    );
} 

export default Logo;

