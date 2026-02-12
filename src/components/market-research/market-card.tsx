import Image from "next/image";
import React from "react";

const MarketCard = ({
  text,
  imagePath,
}: {
  text: string;
  imagePath: string;
}) => {
  return (
    <div className="grid grid-cols-3 w-full min-h-[180px] rounded-xl bg-primary/10 p-4">
      <div className="relative col-span-1 ">
        <Image 
          src={imagePath} 
          alt={imagePath} 
          fill
          className="object-contain rounded-lg" 
        />
      </div>
      <div className="flex flex-col text-left ml-2 col-span-2 items-center justify-center">
        <p className="text-md mt-2 text-gray-600">
          {text}
        </p>
      </div>
    </div>
  );
};

export default MarketCard;
