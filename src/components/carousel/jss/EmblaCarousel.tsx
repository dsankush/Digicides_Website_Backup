import React, { useRef } from "react";
import CardTestimonial from "../card";

type PropType = {
  steps?: {
    description: string;
    description2: string;
    role: string;
    company: string;
  }[];
};

const EmblaCarousel: React.FC<PropType> = ({ steps }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={scrollLeft}
        className="absolute left-10 top-32 z-10 px-4 py-2 bg-orange-500 text-white rounded-full hidden sm:block md:block lg:block xl:block"
        aria-label="Scroll left"
      >
        &lt;
      </button>
      <div
        ref={scrollRef}
        className="overflow-y-auto scrollbar-hidden flex flex-row md:max-h-[500px] lg:max-h-[500px] xl:max-h-[500px]"
      >
        {steps?.map((step, index) => (
          <div className="mb-4" key={index}>
            <CardTestimonial
              description={step.description}
              description2={step.description2}
              role={step.role}
              company={step.company}
            />
          </div>
        ))}
      </div>
      <button
        onClick={scrollRight}
        className="absolute right-10 top-32 z-10 px-4 py-2 bg-orange-500 text-white rounded-full hidden sm:block md:block lg:block xl:block"
        aria-label="Scroll right"
      >
        &gt;
      </button>
    </div>
  );
};

export default EmblaCarousel;
