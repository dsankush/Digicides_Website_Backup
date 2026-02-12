import TestingCarousel from "../carousel/page";
import AwardLeft from "../ui/award-left";
import AwardRight from "../ui/award-right";

const WhatOurCustomerTell = () => {
  return (
    <div className="z-10 flex w-full flex-col items-center justify-start gap-8 text-foreground pt-20 sm:pt-48 md:pt-48 lg:pt-48 xl:pt-48 2xl:pt-48">
      <h2 className="text-center flex justify-center items-center gap-2 text-lg sm:text-3xl md:text-4xl">
        <AwardLeft />
        <div className="flex flex-row items-center gap-2">
        What our
        <span className="rounded-md bg-primary/10 px-2 text-primary">
          Customers
        </span>
        </div>
        tell about us
        <AwardRight />
      </h2>
      <div className="flex w-full flex-col gap-3">
        <TestingCarousel />
      </div>
    </div>
  );
};

export default WhatOurCustomerTell;
