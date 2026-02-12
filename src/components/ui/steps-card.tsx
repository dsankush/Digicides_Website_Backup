import Image from "next/image";
import React from "react";
import Link from "next/link";

const StepsCard = ({
  title,
  text,
  imagePath,
  link="/"
}: {
  title: string;
  text: string;
  imagePath: string;
  link?: string;
}) => {
  return (
    <div className="grid grid-cols-2 w-full min-h-[180px] rounded-xl bg-primary/10 p-4">
      <div className="relative sm:ml-10 md:ml-10 lg:ml-10 xl:ml-10">
        <Image 
          src={imagePath} 
          alt={title} 
          fill
          className="object-contain" 
        />
      </div>
      <div className="flex flex-col text-left ml-2">
        <h3 className="text-xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl font-medium text-primary">{title}</h3>
        <p className="text-md mt-2 text-gray-600">
          {text}
        </p>
        <Link href={link} className="flex items-center text-black font-bold mt-4">
        <button className="flex items-center text-black font-bold mt-4 sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0">
          Know More ↗
        </button>
        </Link>
      </div>
    </div>
  );
};

export default StepsCard;
