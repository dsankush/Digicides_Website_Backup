import MarketCard from "./market-card";

export default function WhyChooseDigicides() {
  return (
    <div className="z-10 flex w-full flex-col items-center justify-start gap-8 px-4 pt-0 text-foreground sm:pt-32 md:px-24 md:pt-12">
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl">
        Why Choose{" "}
        <span className="rounded-md bg-primary/10 px-2 text-primary">Digicides ?</span>
      </h2>
      {/* <p className="text-center text-sm font-normal text-muted-foreground">
          Digicides is driven by a team of industry experts with deep experience in agritech, rural marketing, software development, and research. Our leadership brings a unique blend of technology and market expertise to revolutionize agri-business engagement
          </p> */}
      {/* <div className="h-[1px] w-full bg-border" /> */}
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full flex-col gap-3 md:flex-row">
          <MarketCard
            text="Specialized in agri audience segmentation having seamless multichannel approach: SMS, Meta, WhatsApp, Telegram"
            imagePath="/images/built-for-agri-marketing.png"
          />
          <MarketCard
            text="Rich Digicides Data to support hyper-targeted research in Agri Industry"
            imagePath="/images/seamless-integration.png"
          />
        </div>
        <div className="flex w-full flex-col gap-3 md:flex-row">
          <MarketCard
            text="Expertise in market research, survey marketing, and digital execution"
            imagePath="/images/scalable-and-cost-effective.png"
          />
          <MarketCard
            text="Real-time dashboards and farmer-friendly survey formats"
            imagePath="/images/end-to-end-marketing-support.png"
          />
        </div>
      </div>
    </div>
  );
}
