import ContactUs from "@/components/landing/contact-us";
import OurCustomers from "@/components/landing/our-customers";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Performance Marketing & SEO Services for Agri Brands | Digicides",
  description:
    "Boost your agri business with Google Ads, Facebook campaigns, and SEO services. Get more leads, visibility & growth with Digicides' digital marketing experts.",
  alternates: {
    canonical: "https://www.digicides.com/services/performance-marketing-for-agri-brands"
  },
  openGraph: {
    title: "Performance Marketing & SEO Services for Agri Brands | Digicides",
    description:
      "Boost your agri business with Google Ads, Facebook campaigns, and SEO services. Get more leads, visibility & growth with Digicides' digital marketing experts.",
    url: "https://www.digicides.com/services/performance-marketing-for-agri-brands",
    siteName: "Digicides",
    locale: "en_IN",
    type: "website"
  }
};


export default function PerformanceMarketingAndSeoServices() {
  return (
    <div className="overflow-x-hidden">
      <script type="application/ld+json">
        {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Performance Marketing & SEO Services for Agri Brands",
              "description": "Boost your agri business with targeted digital marketing—Google Ads, SEO, and social media campaigns built for agriculture brands.",
              "url": "https://www.digicides.com/services/performance-marketing-for-agri-brands"
            }
          `}
      </script>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Performance Marketing & SEO Services",
            provider: {
              "@type": "Organization",
              name: "Digicides Marketing Services Pvt. Ltd."
            },
            areaServed: {
              "@type": "Country",
              name: "India"
            },
            description:
              "SEO, social media marketing, Google Ads, and lead generation services tailored for the agriculture industry."
          })
        }}
      />
      <section className="relative pt-8 px-4 sm:px-6 lg:px-8">
        {/* <PixelBg /> */}
        {/* <div className="absolute md:hidden block bottom-0 left-0 right-0 w-full z-[-10] h-12 bg-gradient-to-b from-[#fbf1e8] to-white" /> */}
        {/* <div className="absolute top-0 left-0 right-0 w-full z-[-10] h-12 bg-gradient-to-t from-[#fffdfb] to-white" /> */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col justify-center gap-4 items-center">
            <h1 className="z-10 text-2xl font-normal tracking-tighter text-center text-muted-foreground sm:text-4xl lg:leading-[1.1]">
              Reach the Right Farmers. Maximize Every Rupee.
            </h1>
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-lg md:text-6xl max-w-4xl mt-4 font-normal tracking-tighter text-primary">
                From Fields to Feeds: <span className="text-primary">
                  Grow Your Agri Brand with Digital Marketing
                </span>
              </h2>
              <p className="text-lg max-w-2xl text-center text-muted-foreground mb-4">
                Digicides offers ROI-driven performance marketing, SEO services, and social media marketing—crafted exclusively for agri businesses.
              </p>
              <Link
                href="#contact-us">
                <button className="bg-foreground text-background font-medium py-3 px-8 rounded-full">
                  Get in touch
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex md:flex-row flex-col w-full items-center">
            <div className="md:w-[420px] w-[200px] md:py-0 py-16">
              <Image
                src="/performance-marketing/Performance-Marketing-1.png"
                width={540}
                height={300}
                alt="Traditional marketing vs digital marketing"
                className="h-auto w-[420px] rounded-lg -mt-12"
              />
            </div>
            <div className="w-full">
              <h2 className="text-center mb-6 text-3xl sm:text-4xl">
                Traditional Outreach is {" "}
                <span className="rounded-md bg-primary/10 px-2 text-primary">
                  Outdated
                </span>
              </h2>
              <div className="bg-muted-foreground/30 mb-6 h-[1px] w-full" />
              <p className="text-lg text-center text-muted-foreground mb-4">
                Agri brands used to rely on field visits and pamphlets. But 85% of rural buyers now research products online before purchase. Today&apos;s farmers are on Google, YouTube, Facebook, and Instagram.
              </p>
              <p className="text-lg text-center text-muted-foreground mb-4">
                Digital marketing helps you reach them with precision, track every rupee spent, and deliver stronger ROI.
              </p>
              <p className="text-lg text-center font-medium text-[#2A2A2A]">
                If your competitors are online—you need to be ahead.
              </p>
            </div>
            <div className="md:w-[420px] w-[200px]">
              <Image
                src="/performance-marketing/Performance-Marketing-2.png"
                width={540}
                height={300}
                alt="Traditional marketing vs digital marketing"
                className="h-auto w-[420px] rounded-lg md:-mt-12"
              />
            </div>
          </div>
        </div>
      </section>
      <OurCustomers />
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-6 text-3xl sm:text-4xl">
            Performance Marketing & SEO, Built for{" "}
            <span className="rounded-md bg-primary/10 px-2 text-primary">
              Agri Brands
            </span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-5xl mx-auto">
            We turn agri marketing into measurable results with custom Google and Meta ad campaigns, SEO, and lead generation—all tuned to your region, crop cycle, and buyer behavior.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Google Ads & YouTube",
                description: "Targeted campaigns to reach farmers searching for solutions like yours",
                icon: "🔍"
              },
              {
                title: "Meta Ads",
                description: "Facebook & Instagram campaigns to build brand awareness and engagement",
                icon: "📱"
              },
              {
                title: "SEO Services",
                description: "Rank higher in search results when farmers look for agricultural solutions",
                icon: "📈"
              },
              {
                title: "Lead Generation",
                description: "Convert visitors into qualified leads with optimized landing pages",
                icon: "🎯"
              },
              {
                title: "Social Media Management",
                description: "Build your brand's presence where your customers spend their time",
                icon: "💬"
              }
            ].map((service, index) => (
              <div key={index} className="bg-[#FEF4E8] p-6 rounded-xl transition duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-medium text-xl text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Our Process */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-6 text-3xl sm:text-4xl">
            Smart{" "}
            <span className="rounded-md bg-primary/10 px-2 text-primary">
              Strategy
            </span>
            {" "}Strong{" "}
            <span className="rounded-md bg-primary/10 px-2 text-primary">
              Results
            </span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-5xl mx-auto">
            Our process ensures every rupee you spend delivers value—whether it&apos;s visibility, engagement, or verified leads.
          </p>
          <div className="flex flex-col md:flex-row">
            {[
              {
                step: "01",
                title: "Understand Your Goals",
                description: "We start by identifying what matters most—awareness, engagement, or lead generation?"
              },
              {
                step: "02",
                title: "Create the Strategy",
                description: "From media planning to content creation, we build a roadmap for your success"
              },
              {
                step: "03",
                title: "Launch Campaigns",
                description: "SEO + Paid Media = Wider Reach. We implement your strategy across platforms"
              },
              {
                step: "04",
                title: "Optimize Continuously",
                description: "With keyword research, competitor analysis, and real-time reporting"
              }
            ].map((step, index) => (
              <div key={index} className="relative mb-8 md:mb-0 md:flex-1">
                <div className="border-l-4 border-[#FEF4E8] pl-8 md:border-l-0 md:border-t-4 md:pt-4 md:pl-0">
                  <div className="absolute top-0 -left-3 md:-top-3 md:left-0 bg-[#FEF4E8] text-foreground text-sm font-medium rounded-full size-9 flex items-center justify-center">
                    {step.step}
                  </div>
                  <h3 className="font-medium text-xl text-foreground mb-2 mt-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm pr-4">{step.description}</p>
                </div>
              </div>
            ))}
          </div>


        </div>
      </section>
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-4 text-3xl sm:text-4xl">
            Services We{" "}
            <span className="rounded-md bg-primary/10 px-2 text-primary">
              Offer
            </span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-5xl mx-auto">All-in-One Digital Growth Suite</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 pt-0 rounded-xl">
              <h3 className="text-2xl font-medium text-foreground mb-6">Performance Marketing Services</h3>
              <ul className="space-y-4">
                {[
                  "Google Ads (Search, Display, YouTube)",
                  "Facebook & Instagram Ads",
                  "Lead Generation Campaigns",
                  "WhatsApp & Missed Call Integrations",
                  "Landing Page Design + A/B Testing – Pages that convert"
                ].map((service, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 pt-0 rounded-xl">
              <h3 className="text-2xl font-medium text-foreground mb-6">SEO Services</h3>
              <ul className="space-y-4">
                {[
                  "On-Page & Off-Page SEO",
                  "Local SEO for Dealers & Distributors",
                  "Keyword Research + Competitor Analysis",
                  "Technical SEO & Speed Optimization",
                  "YouTube Optimization & Blog Content Strategy"
                ].map((service, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-6 text-3xl sm:text-4xl">
            We Know Agri. We Deliver {" "}
            <span className="rounded-md bg-primary/10 px-2 text-primary">
              Results.
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Specialists in Agri Marketing",
                description: "We understand the unique challenges and opportunities in the agriculture sector"
              },
              {
                title: "Data-Driven Performance",
                description: "Every campaign is built on insights and optimized for measurable results"
              },
              {
                title: "Advanced SEO Services",
                description: "Technical expertise that helps you rank higher and get found online"
              },
              {
                title: "Smart, Scalable Strategy",
                description: "Marketing approaches that grow with your business needs"
              },
              {
                title: "Complete Support",
                description: "From planning to execution, we're with you every step of the way"
              },
              {
                title: "Rural Market Focus",
                description: "Specialized approaches to connect with farmers and rural communities"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-[#FEF4E8] p-6 rounded-xl transition duration-300">
                <h3 className="font-medium text-xl text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-6 text-3xl sm:text-4xl">
            Real Results with Real {" "}
            <span className="rounded-md bg-primary/10 px-2 text-primary">
              Impact
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Lead Generation Success",
                description: "Generated 12,000+ qualified leads for a Fertilizer brand using Meta and Instagram.",
                icon: "📊"
              },
              {
                title: "SEO Traffic Growth",
                description: "Improved keyword rankings for a Fertilizer brand by shifting focus from branded to high-intent search terms through strategic SEO.",
                icon: "🚀"
              },
              {
                title: "Video Marketing Reach",
                description: "Achieved 1L+ video views through YouTube marketing services in rural belts",
                icon: "📹"
              }
            ].map((caseStudy, index) => (
              <div key={index} className="bg-[#FEF4E8] p-6 rounded-xl transition duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-4">{caseStudy.icon}</div>
                <h3 className="font-medium text-xl text-foreground mb-2">{caseStudy.title}</h3>
                <p className="text-muted-foreground mb-4">{caseStudy.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="flex flex-col gap-4 -mb-8 md:-mb-36">
        <h2 className="text-center text-3xl sm:text-4xl">
          Let&apos;s Start Your Digital Growth&nbsp;
          <span className="rounded-md bg-primary/10 px-2 text-primary">
            Journey
          </span>
        </h2>
      </div>
      <ContactUs />
    </div>
  )
}