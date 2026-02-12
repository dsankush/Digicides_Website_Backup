import ContactUs from "@/components/landing/contact-us";
import OurCustomers from "@/components/landing/our-customers";
import { RuralRewardCarousel } from "@/components/analytics/analytics-carousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const fullFunnelFeatures = [
  {
    title: "Complete Transparency",
    description: "Track regional engagement and farmer sentiment in real time"
  },
  {
    title: "End-to-End Journey",
    description: "Monitor from first call to final retail sale"
  },
  {
    title: "Actionable Insights",
    description: "Measure product performance in the field instantly"
  }
];

const keyFeatures = [
  {
    title: "Lead Flow Tracking",
    description: "Know where your leads come from and where they convert with accurate lead tracking for agri campaigns",
  },
  {
    title: "Farmer Behavior Analytics",
    description: "Understand what crops, inputs, and support farmers need with actionable insights",
  },
  {
    title: "Retail Performance",
    description: "Monitor which retailers are moving your products and identify high-performing markets",
  },
  {
    title: "Real-Time Dashboard",
    description: "Instantly visualize performance metrics with a live, agriculture-focused analytics dashboard",
  },
  {
    title: "Campaign Impact Reports",
    description: "See which marketing campaigns are driving farmer engagement and delivering measurable ROI",
  },
  {
    title: "Multi-Layer Filtering",
    description: "Slice and analyze data by state, crop, channel, language, and more for precise agri business intelligence",
  }
];

const howItWorksSteps = [
  {
    title: "Data Collection",
    description: "Capture engagement data from missed calls, WhatsApp, SMS, and IVR across farmer and retail touchpoints",
  },
  {
    title: "Auto Categorization",
    description: "Automatically organize leads by type, region, retailer, language, and more for smarter segmentation",
  },
  {
    title: "Dashboard Integration",
    description: "Deliver structured, clean reporting through a centralized real-time analytics platform, purpose-built as a rural market insights platform",
  },
  {
    title: "Real-Time Sync",
    description: "Keep every stakeholder aligned with continuous data pipeline updates and live insights",
  },
  {
    title: "Team Access",
    description: "Enable on-ground sales teams and regional managers to access actionable insights anytime, anywhere",
  }
];

const supportingServices = [
  {
    title: "SMS",
    description: "Send links, OTPs, and exclusive offers straight to farmers' phones for instant access and action.",
  },
  {
    title: "WhatsApp",
    description: "Connect instantly via WhatsApp or BOT to share updates, answer queries, and capture interactive responses.",
  },
  {
    title: "Social Media",
    description: "Drive awareness and engagement with targeted posts, ads, and storytelling across popular platforms.",
  },
  {
    title: "Market Research",
    description: "Uncover rural market trends and insights to shape smarter, results-driven campaigns.",
  }
];

const whyChooseDigicides = [
  {
    title: "Agri-first data solutions built specifically for agriculture brands",
    icon: "🌾"
  },
  {
    title: "Field-proven reporting pipelines that deliver accurate, real-time insights",
    icon: "📊"
  },
  {
    title: "Language-specific insights to engage farmers in their local dialects",
    icon: "🗣️"
  },
  {
    title: "Custom filters for granular tracking by crop, region, channel, and language",
    icon: "🔍"
  },
  {
    title: "Actionable metrics that drive decisions — not just charts and dashboards",
    icon: "📈"
  }
];

export const metadata = {
  title: "Real-Time Agri Analytics Platform | Track ROI & Engagement",
  description: "Unlock full-funnel visibility with Digicides' Agri Analytics Platform. Track farmer leads, campaign ROI & retail sales in real time. Request a demo today.",
  alternates: {
    canonical: "https://www.digicides.com/product/analytics"
  },
  openGraph: {
    title: "Real-Time Agri Analytics Platform | Track ROI & Engagement",
    description: "Unlock full-funnel visibility with Digicides' Agri Analytics Platform. Track farmer leads, campaign ROI & retail sales in real time. Request a demo today.",
    url: "https://www.digicides.com/product/analytics",
    siteName: "Digicides",
    locale: "en_IN",
    type: "website"
  }
};

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col overflow-x-hidden gap-20">
      <script type="application/ld+json">
        {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Real-Time Agri Analytics Platform | Track ROI & Engagement",
              "description": "Unlock full-funnel visibility with Digicides' Agri Analytics Platform. Track farmer leads, campaign ROI & retail sales in real time. Request a demo today.",
              "url": "https://www.digicides.com/product/analytics"
            }
          `}
      </script>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Agri Analytics Platform for Data-Driven Marketing",
            provider: {
              "@type": "Organization",
              name: "Digicides Marketing Services Pvt. Ltd."
            },
            areaServed: {
              "@type": "Country",
              name: "India"
            },
            description: "Unlock full-funnel visibility with Digicides' Agri Analytics Platform. Track farmer leads, campaign ROI & retail sales in real time. Request a demo today."
          })
        }}
      />
      
      {/* Header Section (Hero) */}
      <section className="container relative flex flex-col items-center py-8 gap-2 text-center text-foreground">
        <h1 className="z-10 text-2xl font-normal tracking-tighter text-center text-muted-foreground sm:text-4xl lg:leading-[1.1]">
          Analyse Performance at Every Step with Our Agri Analytics Platform
        </h1>
        <div className="block xl:hidden h-[250px]">
          <RuralRewardCarousel />
        </div>
        <div className="flex flex-row md:gap-8 md:pt-12 pt-0">
          <div className="flex w-fit flex-col xl:justify-start items-center xl:items-start gap-4 md:gap-10 md:pt-12 pt-0">
            <h2 className="text-lg md:text-5xl text-center md:text-left md:max-w-xl font-normal tracking-tighter text-primary">
              Turn farmer and retailer interactions into insights. Built for agri brands.
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-regular mx-10 max-w-2xl text-muted-foreground lg:mx-0 lg:text-left xl:mx-0 xl:text-left">
              Track every interaction — from lead generation to product adoption. Our agri analytics platform gives brands the power to measure campaign ROI, understand engagement across regions, and monitor product performance at the retail level — all in one dashboard.
            </p>
            <Button
              variant="secondary"
              size="lg"
              className="w-fit text-md sm:text-xl h-[64px]"
            >
              <Link href="#contact-us">
                Request a Demo
              </Link>
            </Button>
          </div>
          <div className="hidden xl:block 2xl:block 3xl:block 4xl:block 5xl:block 6xl:block 7xl:block 8xl:block 9xl:block 10xl:block">
            <div className="right-0 h-[500px]">
              <RuralRewardCarousel />
            </div>
          </div>
        </div>
      </section>

      <div className="size-full -mt-28">
        <OurCustomers />
      </div>

      {/* Section 1: Full-Funnel Visibility */}
      <section className="2xl:max-w-7xl max-w-5xl px-4 mx-auto">
        <h2 className="text-4xl font-medium text-medium text-center mb-12">
          Full-Funnel Visibility for Agri Brands
        </h2>
        <h3 className="text-xl font-semibold text-foreground mb-2 text-center">
          From the very first call to the final retail sale — see it all.
        </h3>
        <p className="text-[#212121]/60 text-center mb-8">
          Turning your vision into visible results!
        </p>
        <p className="text-[#212121]/60 text-center mb-12">
          We provide complete transparency with agri marketing analytics, giving agri brands full-funnel visibility across the entire customer journey — from tracking regional engagement to understanding what farmers are saying, and measuring product performance in the field — all in real time.
        </p>
        
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Image on Left */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <Image
              src="/analytics/full-funnel-visual.png"
              alt="Full-Funnel Analytics Visualization"
              width={600}
              height={450}
              className="rounded-xl w-full max-w-[600px]"
            />
          </div>

          {/* Features on Right */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 gap-6">
            {fullFunnelFeatures.map((content, index) => (
              <div key={index} className="bg-[#FEF4E8] p-6 rounded-[15px] transition duration-300 hover:shadow-md">
                <h4 className="text-lg font-semibold text-[#212121] mb-3">{content.title}</h4>
                <p className="text-[#212121]/60">{content.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="2xl:max-w-7xl max-w-5xl px-4 mx-auto">
        <h2 className="text-4xl font-medium text-medium text-center mb-12">
          Insights That Drive Growth
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px]">
          {keyFeatures.map((feature, index) => (
            <div key={index} className="bg-[#FEF4E8] p-6 rounded-[15px] transition duration-300">
              <h3 className="text-xl font-medium text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-[#212121]/60">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How We Power Real-Time Analytics */}
      <section className="w-full px-4 bg-white">
        <div className="container mx-auto 2xl:max-w-7xl max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-medium text-medium text-center mb-12">
              How We Power Real-Time Analytics
            </h2>
          </div>

          <div className="relative flex md:flex-row flex-col justify-between">
            <div className="grid grid-cols-1 gap-8 md:gap-12">
              {howItWorksSteps.map((step, index) => (
                <div key={index} className="relative flex flex-row gap-3 items-start text-start">
                  <div className="bg-[#FEF4E8] text-foreground h-8 px-3 rounded-full flex items-center text-nowrap justify-center text-sm font-normal z-10">
                    STEP {index + 1}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-[#212121]/60">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="md:mt-16 mt-12 flex justify-center">
              <Image
                src="/analytics/analytics-workflow.jpg"
                alt="Real-Time Analytics Process Flow"
                width={800}
                height={400}
                className="aspect-2/1 w-[480px] xl:w-[600px] h-[320px] xl:h-[413px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Supporting Services */}
      <section className="w-full px-4">
        <div className="container mx-auto max-w-5xl 2xl:max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-medium text-medium text-center mb-12">
              Supporting Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportingServices.map((service, index) => (
              <div key={index} className="bg-[#FEF4E8] p-8 rounded-[15px] transition duration-300">
                {index === 0 && (
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.8402 20.8107L20.967 23.8049C21.2644 24.0208 21.6746 23.9887 21.9349 23.7292L24.4073 21.2625C24.637 21.0315 24.6916 20.6787 24.5426 20.389C22.6462 16.6533 18.0274 14.0166 12.6254 14.0166C7.22328 14.0166 2.60452 16.6533 0.708111 20.389C0.558057 20.679 0.612404 21.0327 0.842594 21.2642L3.31501 23.7292C3.57523 23.9887 3.98545 24.0208 4.28287 23.8049L8.40963 20.8107C8.55686 20.7038 8.65989 20.5468 8.69928 20.3692L9.19584 18.1247C9.27019 17.7981 9.52125 17.5407 9.8459 17.4581C11.6678 16.9936 13.5771 16.9936 15.399 17.4581C15.7237 17.5405 15.9746 17.7981 16.0487 18.1247L16.5452 20.3692C16.586 20.5476 16.691 20.7047 16.8402 20.8107Z" fill="black" />
                    <path d="M21.3147 2.0166L14.1532 2.81233L16.4584 5.11757L12.575 9.00102L6.00145 3.15784C5.67094 2.85662 5.20398 2.75643 4.779 2.89557C4.35402 3.0347 4.03671 3.39165 3.94834 3.83C3.85997 4.26836 4.01419 4.72037 4.35207 5.01329L11.8003 11.634C12.2916 12.0705 13.0379 12.0486 13.5027 11.5839L18.2137 6.87288L20.519 9.17812L21.3147 2.0166Z" fill="black" />
                  </svg>
                )}
                {index === 1 && (
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20.8339 4.99051C18.7289 2.88306 15.9295 1.72194 12.9471 1.7207C6.80162 1.7207 1.80009 6.72209 1.79762 12.8692C1.7968 14.8343 2.31013 16.7525 3.28586 18.4433L1.7041 24.2207L7.61461 22.6703C9.24319 23.5586 11.0767 24.0268 12.9426 24.0273H12.9472C19.092 24.0273 24.0941 19.0255 24.0964 12.8781C24.0977 9.89893 22.939 7.09782 20.8339 4.99051ZM12.9471 22.1444H12.9433C11.2805 22.1437 9.64969 21.6969 8.22668 20.8527L7.88844 20.6518L4.38106 21.5719L5.31723 18.1523L5.09682 17.8017C4.16916 16.3262 3.67931 14.6208 3.68013 12.8699C3.68205 7.76057 7.83928 3.60376 12.9508 3.60376C15.426 3.60458 17.7528 4.56973 19.5024 6.32137C21.2519 8.073 22.2149 10.4013 22.2141 12.8775C22.2119 17.9872 18.0549 22.1444 12.9471 22.1444ZM18.0302 15.2039C17.7517 15.0644 16.382 14.3907 16.1265 14.2976C15.8714 14.2046 15.6854 14.1583 15.4999 14.4371C15.3141 14.7159 14.7803 15.3435 14.6177 15.5293C14.4551 15.7152 14.2928 15.7386 14.0141 15.599C13.7355 15.4597 12.8379 15.1654 11.7738 14.2163C10.9457 13.4776 10.3866 12.5653 10.224 12.2865C10.0617 12.0075 10.2226 11.8712 10.3462 11.718C10.6478 11.3435 10.9498 10.9509 11.0426 10.7651C11.1356 10.5791 11.089 10.4164 11.0193 10.277C10.9498 10.1376 10.3926 8.76637 10.1606 8.2084C9.93423 7.66541 9.70476 7.73874 9.53365 7.73022C9.37132 7.72212 9.18552 7.72047 8.99971 7.72047C8.81404 7.72047 8.51219 7.7901 8.25676 8.06915C8.00146 8.34807 7.28186 9.02194 7.28186 10.3932C7.28186 11.7644 8.28011 13.0891 8.41936 13.275C8.55861 13.461 10.3839 16.2748 13.1784 17.4814C13.843 17.7687 14.3619 17.94 14.7666 18.0684C15.434 18.2804 16.0411 18.2505 16.5212 18.1788C17.0565 18.0987 18.1693 17.5048 18.4017 16.8541C18.6338 16.2033 18.6338 15.6456 18.564 15.5293C18.4945 15.4131 18.3087 15.3435 18.0302 15.2039Z" fill="black" />
                  </svg>
                )}
                {index === 2 && (
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 2C6.98 2 2.5 6.48 2.5 12C2.5 17.52 6.98 22 12.5 22C18.02 22 22.5 17.52 22.5 12C22.5 6.48 18.02 2 12.5 2ZM16.5 12.5H13V16C13 16.55 12.55 17 12 17C11.45 17 11 16.55 11 16V12.5H7.5C6.95 12.5 6.5 12.05 6.5 11.5C6.5 10.95 6.95 10.5 7.5 10.5H11V7C11 6.45 11.45 6 12 6C12.55 6 13 6.45 13 7V10.5H16.5C17.05 10.5 17.5 10.95 17.5 11.5C17.5 12.05 17.05 12.5 16.5 12.5Z" fill="black" />
                  </svg>
                )}
                {index === 3 && (
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5 3H5.5C4.4 3 3.51 3.9 3.51 5L3.5 19C3.5 20.1 4.4 21 5.5 21H19.5C20.6 21 21.5 20.1 21.5 19V5C21.5 3.9 20.6 3 19.5 3ZM19.5 19H5.5V5H19.5V19ZM7.5 12H9.5V17H7.5V12ZM11.5 7H13.5V17H11.5V7ZM15.5 14H17.5V17H15.5V14Z" fill="black" />
                  </svg>
                )}
                <h3 className="text-xl mt-4 font-medium text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-[#212121]/60 mb-4">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="w-full px-2 sm:px-4">
        <div className="container mx-auto max-w-5xl 2xl:max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-medium text-medium text-center mb-12">
              Case Study
            </h2>
          </div>

          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#FEF4E8] p-6 rounded-lg">
                <h4 className="text-lg font-medium text-foreground mb-2">Challenge</h4>
                <p className="text-muted-foreground">
                  The brand struggled to get a complete picture — no single view to track multi-year usage, conference participation trends, or how many farmers they were actually reaching.
                </p>
              </div>

              <div className="bg-[#FEF4E8] p-6 rounded-lg">
                <h4 className="text-lg font-medium text-foreground mb-2">Solution</h4>
                <p className="text-muted-foreground">
                  We built an interactive dashboard with powerful filters, year-on-year and month-on-month trends, plus clear KPIs for conferences, pulse consumption, and connected members — all in one place.
                </p>
              </div>

              <div className="bg-[#FEF4E8] p-6 rounded-lg">
                <h4 className="text-lg font-medium text-foreground mb-2">Result</h4>
                <p className="text-muted-foreground mb-2">
                  In minutes, the team spotted their best-performing months (like May 2021), uncovered a sharp engagement dip in 2023, and used these insights powered by data-driven agri marketing to fine-tune strategy — all from a single, visual report.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Digicides */}
      <section className="2xl:max-w-7xl max-w-5xl px-4 mx-auto">
        <h2 className="text-4xl font-medium text-medium text-center mb-4">
          Why Choose Digicides
        </h2>
        <h3 className="text-xl text-center text-muted-foreground mb-12">
          Smart Data for Smart Farming
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px]">
          {whyChooseDigicides.map((item, index) => (
            <div key={index} className="bg-[#FEF4E8] p-6 rounded-[15px] transition duration-300 flex items-center gap-4">
              <span className="text-3xl">{item.icon}</span>
              <p className="text-[#212121] font-medium">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full px-4 bg-[#FEF4E8] py-16">
        <div className="container mx-auto max-w-5xl 2xl:max-w-7xl text-center">
          <h2 className="text-3xl md:text-5xl font-medium text-foreground mb-6">
            Ready to Decode Your Agri Data?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Turn farmer interactions into actionable insights. Let&apos;s use real-time analytics to drive your next big growth leap — start today.
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="w-fit text-md sm:text-xl h-[64px]"
          >
            <Link href="#contact-us">
              Get Started
            </Link>
          </Button>
        </div>
      </section>

      <section id="contact-us" className="-mt-24 md:-mt-44">
        <ContactUs />
      </section>
    </div>
  );
}