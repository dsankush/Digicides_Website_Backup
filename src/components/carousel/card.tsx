// const CardTestimonial = ({
//   description,
//   description2,
//   role,
//   company,
// }: {
//   description: string;
//   description2: string;
//   role: string;
//   company: string;
// }) => {
//   return (
//     <div className="rounded-xl w-[95%] sm:w-full md:w-full lg:w-full xl:w-full mx-auto bg-[#f7f7f7] h-[600px] sm:h-[380px] md:h-[380px] lg:h-[380px] xl:h-[380px] p-2 sm:mx-5 md:mx-12 overflow-y-auto">
//       <div className="flex flex-col gap-4 rounded-xl p-4">
//         <p className="text-md text-foreground">{description}</p>
//         <p className="text-md text-foreground">{description2}</p>
//       </div>
//       <div className="flex flex-col gap-1 px-4 text-left mt-auto">
//         <h3 className="text-md font-medium text-muted-foreground">{role}</h3>
//         <p className="text-md text-muted-foreground">{company}</p>
//       </div>
//     </div>
//   );
// };

// export default CardTestimonial;

const CardTestimonial = ({
  description,
  description2,
  role,
  company,
}: {
  description: string;
  description2: string;
  role: string;
  company: string;
}) => {
  return (
    <div className="rounded-xl w-[350px] sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[800px] mx-10 bg-[#f7f7f7] h-[600px] sm:h-[380px] md:h-[380px] lg:h-[380px] xl:h-[380px] p-2 sm:mx-5 md:mx-12">
      <div className="flex flex-col gap-4 rounded-xl p-4">
        <p className="text-md text-foreground">{description}</p>
        <p className="text-md text-foreground">{description2}</p>
      </div>
      <div className="flex flex-col gap-1 px-4 text-left mt-auto">
        <h3 className="text-md font-medium text-muted-foreground">{role}</h3>
        <p className="text-md text-muted-foreground">{company}</p>
      </div>
    </div>
  );
};

export default CardTestimonial;
