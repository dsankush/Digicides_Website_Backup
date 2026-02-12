import WhyCard from "../ui/why-card";

const WhyChooseUs = () => {
  return (
    <div className="z-10 flex w-full flex-col items-center justify-start gap-8 px-4 pt-20 sm:pt-48 md:pt-48 lg:pt-48 xl:pt-48 2xl:pt-48 text-foreground md:px-24 xl:px-44">
      <h2 className="text-center text-3xl md:text-4xl">
        Why choose{" "}
        <span className="rounded-md bg-primary/10 px-2 text-primary">us?</span>
      </h2>
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full flex-col gap-3 md:flex-row">
          <WhyCard
            title="Built for Agri-Marketing"
            text="Industry-specific SaaS solutions designed exclusively for agriculture."
            imagePath="/images/built-for-agri-marketing.png"
          />
          <WhyCard
            title="Seamless Integration"
            text="Easily integrates into your existing workflow for hassle-free adoption."
            imagePath="/images/seamless-integration.png"
          />
        </div>
        <div className="flex flex-col gap-3 md:flex-row">
          <WhyCard
            title="Scalable & Cost-Effective"
            text="Grow your reach with data-backed, budget-friendly solutions."
            imagePath="/images/scalable-and-cost-effective.png"
          />
          <WhyCard
            title="End-to-End Marketing Support"
            text="From lead generation to conversion tracking, we’ve got you covered."
            imagePath="/images/end-to-end-marketing-support.png"
          />
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
