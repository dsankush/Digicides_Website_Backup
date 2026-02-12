import StepsCard from "../ui/steps-card";

const WhatDoWeDo = () => {
  return (
    <div className="z-10 flex w-full flex-col items-center justify-start gap-8 px-4 pt-20 sm:pt-32 md:pt-32 lg:pt-32 xl:pt-32 2xl:pt-32 text-foreground md:px-24 xl:px-44">
      <h2 className="text-center text-3xl md:text-4xl">
        What do we{" "}
        <span className="rounded-md bg-primary/10 px-2 text-primary">do?</span>
      </h2>
      <p className="text-center text-sm font-normal text-muted-foreground">
      We are a product-first company dedicated to revolutionizing agricultural marketing. Our suite of
      innovative SaaS solutions enables agribusinesses to elevate their marketing, improve
      communication, and engage more meaningfully—leading to sustainable sales and business
      growth.
      </p>
      <div className="h-[1px] w-full bg-border" />
      <h4 className="text-center text-xl font-normal text-foreground">
        Our Vision is to help businesses to…
      </h4>
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full flex-col gap-3 md:flex-row">
          <StepsCard
            title="Discover"
            text="Identify and connect with potential customers in the agriculture industry who
            are genuine and interested in your agricultural products."
            imagePath="/images/discover.png"
          />
          <StepsCard
            title="Engage"
            text="Leverage omni-channel communication tools to interact with farmers effectively."
            imagePath="/images/engage.png"
            link="/services/engagement"
          />
        </div>
        <div className="flex w-full flex-col gap-3 md:flex-row">
          <StepsCard
            title="Convert"
            text="Turn high-intent leads into loyal customers with targeted follow-ups and insights."
            imagePath="/images/convert.png"
            link="/product/rural-reward"
          />
          <StepsCard
            title="Analyse"
            text="Gain complete transparency on lead performance, farmer interactions, and
            retail-level product management."
            imagePath="/images/analyse.png"
          />
        </div>
      </div>
    </div>
  );
};

export default WhatDoWeDo;
