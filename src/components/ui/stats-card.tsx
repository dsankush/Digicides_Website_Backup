import React from "react";

const StatsCard = ({
  number,
  text,
  lucideIcon,
}: {
  number: string | number;
  text: string;
  lucideIcon: React.ReactNode;
}) => {
  return (
    <div className="flex w-full sm:w-[270px] md:w-[270px] lg:w-[270px] xl:w-[270px] 2xl:w-[270px] items-center justify-start rounded-2xl border-2 border-primary/20 bg-white p-7 my-0 sm:my-10 md:my-10 lg:my-10 xl:my-10 2xl:my-10">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-primary/40 text-background">
        {lucideIcon}
      </div>
      <div className="ml-3 flex flex-col items-start justify-start">
        <span className="text-3xl font-bold text-primary">{number}</span>
        <span className="text-nowrap text-sm text-muted-foreground">
          {text}
        </span>
      </div>
    </div>
  );
};

export default StatsCard;
