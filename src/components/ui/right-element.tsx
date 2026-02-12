import Image from "next/image";

const RightElement = () => {
  return (
    <div className="-mt-60 -mr-40 right-0">
      <Image 
        src="/images/right-element-mobile.webp" 
        alt="Right Element" 
        // layout="responsive" 
        width={3000} 
        height={3000} 
      />
    </div>
  );
};

export default RightElement;
