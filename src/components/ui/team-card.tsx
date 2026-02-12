import Image from "next/image";
import React from "react";

const TeamCard = ({
  title,
  text,
  imagePath,
}: {
  title: string;
  text: string;
  imagePath: string;
}) => {
  return (
    <div className="grid grid-cols-3 w-full min-h-[180px] rounded-xl bg-primary/10 p-4">
      <div className="relative col-span-1 ">
        <Image 
          src={imagePath} 
          alt={title} 
          fill
          className="object-contain rounded-lg" 
        />
      </div>
      <div className="flex flex-col text-left ml-2 col-span-2">
        <h3 className="text-xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl font-medium text-primary">{title}</h3>
        <p className="text-md mt-2 text-gray-600">
          {text}
        </p>
      </div>
    </div>
  );
};

export default TeamCard;
