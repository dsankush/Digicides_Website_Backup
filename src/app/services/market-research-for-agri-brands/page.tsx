import ContactUs from "@/components/landing/contact-us";
import MarketResearchHero from "@/components/market-research/hero";
import WhyChooseDigicides from "@/components/market-research/why-choose";
import Image from "next/image";

export const metadata = {
  title: "Market Research & Survey Marketing for Agri Brands | Digicides",
  description:
    "Gather insights with Digicides' market research and survey marketing for agri brands. Capture farmer data via SMS, WhatsApp, and digital surveys.",
  alternates: {
    canonical: "https://www.digicides.com/services/market-research-for-agri-brands"
  },
  openGraph: {
    title: "Market Research & Survey Marketing for Agri Brands | Digicides",
    description:
      "Gather insights with Digicides' market research and survey marketing for agri brands. Capture farmer data via SMS, WhatsApp, and digital surveys.",
    url: "https://www.digicides.com/services/market-research-for-agri-brands",
    siteName: "Digicides",
    locale: "en_IN",
    type: "website"
  }
};

export default function MarketResearchAndCampaignExecution() {
  return (
    <div className="flex flex-col overflow-x-hidden gap-12 md:gap-20">
      <script type="application/ld+json">
        {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Market Research & Survey Marketing for Agri Brands | Digicides",
              "description": "Gather insights with Digicides' market research and survey marketing for agri brands. Capture farmer data via SMS, WhatsApp, and digital surveys.",
              "url": "https://www.digicides.com/services/market-research-for-agri-brands"
            }
          `}
      </script>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Market Research & Survey Marketing for Agri Brands | Digicides",
            provider: {
              "@type": "Organization",
              name: "Digicides Marketing Services Pvt. Ltd."
            },
            areaServed: {
              "@type": "Country",
              name: "India"
            },
            description:
              "Gather insights with Digicides' market research and survey marketing for agri brands. Capture farmer data via SMS, WhatsApp, and digital surveys."
          })
        }}
      />
      <MarketResearchHero />
      <div className="z-10 flex w-full flex-col items-center justify-start gap-8 px-4 pt-0 text-foreground sm:pt-32 md:px-24 md:pt-12">
        <h2 className="text-center text-2xl sm:text-4xl">
          Why Market Research Matters{" "}
          <span className="rounded-md bg-primary/10 px-2 text-primary">
            in Agri Marketing
          </span>
        </h2>
        <div className="h-[1px] w-full bg-border" />
        <p className="text-md text-center font-normal text-muted-foreground">
          Traditional surveys are{" "}
          <b>time-consuming, costly, and disconnected</b>. Agri brands need{" "}
          <b>fast, reliable, and actionable insights</b>—directly from the
          farmers they serve. Our approach combines survey marketing with
          digital engagement, letting you gather data while building brand
          awareness.
        </p>
      </div>
      <div className="z-10 flex w-full flex-col items-center justify-start gap-8 px-4 pt-0 text-foreground sm:pt-32 md:px-24 md:pt-12">
        <h2 className="text-center text-2xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl">
          Our Market Research &{" "}
          <span className="rounded-md bg-primary/10 px-2 text-primary">
            Campaign Execution Workflow
          </span>
        </h2>
        <p className="text-md text-center font-normal text-muted-foreground">
          We turn traditional market research surveys into powerful digital
          campaigns designed to collect data and create engagement—at scale.
        </p>
        <Image
          src="/market-research/market-research-dashboard.jpg"
          alt="Market Research Dashboard"
          width={1000}
          height={1000}
          className="my-10"
        />
        <div className="h-[1px] w-full bg-border" />
        <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row 3xl:flex-row 4xl:flex-row 5xl:flex-row 6xl:flex-row 7xl:flex-row 8xl:flex-row 9xl:flex-row 10xl:flex-row gap-10 text-center tracking-wider px-2">
          <h3><text className="text-orange-500">•</text> Audience-Centric Data Collection</h3>
          <h3><text className="text-orange-500">•</text> Defining Your Campaign Objectives</h3>
          <h3><text className="text-orange-500">•</text> Channel Planning & Strategy </h3>
          <h3><text className="text-orange-500">•</text> Campaign Execution & Automation</h3>
          <h3><text className="text-orange-500">•</text> Insightful Reporting & Feedback Loop</h3>
        </div>
      </div>
      <WhyChooseDigicides />
      {/* <div className="flex flex-col gap-5 -mb-36 md:-mb-44"> */}
      <div className="z-10 flex w-full flex-col items-center justify-start gap-8 px-4 pt-0 -mb-24 md:-mb-60 text-foreground sm:pt-32 md:px-24 md:pt-12">

        <h2 className="text-center text-2xl sm:text-4xl">
          Ready to Know{" "}
          <span className="rounded-md bg-primary/10 px-2 text-primary">
            Your Market ?
          </span>
        </h2>
        <p className="text-md text-center font-normal text-muted-foreground">
          <b>Let&apos;s Build Research-Driven Campaigns That Deliver Actionable Insights.</b>
          <br /> Combine data collection with communication and drive real growth
          for your agri brand.
        </p>
      </div>
      <ContactUs />
    </div>
  );
}
