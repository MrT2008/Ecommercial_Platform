import React from "react";

const Support = () => {
    return ( 
        <div className="w-full md:w-1/4 lg:w-1/5 flex flex-col items-start text-white px-4 mb-6 md:mb-0 md:px-2">
            <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
                Support
            </h2>
            <a href="" className="text-sm md:text-base mb-2 hover:underline">
                111 Bijoy Nagar, Dhaka, DH115, Bangladesh
            </a>
            <a href="mailto:gmail@gmail.com" className="text-sm md:text-base mb-2 hover:underline">
                gmail@gmail.com
            </a>
            <a href="tel:123-456-7890" className="text-sm md:text-base hover:underline">
                123-456-7890
            </a>
        </div>
    )
}

export default Support;