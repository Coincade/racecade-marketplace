import React from "react";
import Image from "next/image";

const CurrCard = ({ title, value, imageSrc }) => {
  return (
    <div className="w-full sm:w-56 md:w-64 lg:w-72 my-4"> 
      <div
        className="block max-w-sm p-6 bg-white  rounded-lg shadow dark:bg-nft-black-3 h-auto" 
      >
        <div className="flex items-center mb-2">
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={title}
              className="w-10 h-10 object-contain mr-2"
            />
          )}
          <h5 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </div>
        <hr className="border-gray-300 dark:border-gray-600 my-2" />

        <p className="font-bold text-center text-2xl text-black dark:text-white  sm:text-base">{value}</p> {/* Responsive text size */}
      </div>
    </div>
  );
};

export default CurrCard;




