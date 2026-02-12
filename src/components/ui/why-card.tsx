import Image from "next/image";

const WhyCard = ({
  title,
  text,
  imagePath,
}: {
  title: string;
  text: string;
  imagePath: string;
}) => {
  return (
    <div className="flex w-full flex-col rounded-xl bg-primary/10 p-4">
      <div className="relative mb-6 flex w-full flex-col">
        <Image
          src={imagePath}
          alt={title}
          width={100}
          height={100}
          className="size-12 object-cover"
        />
      </div>
      <div className="ml-2 flex flex-col gap-4 text-left">
        <h3 className="text-xl font-medium text-black">{title}</h3>
        <p className="text-md text-gray-600">{text}</p>
      </div>
    </div>
  );
};

export default WhyCard;
