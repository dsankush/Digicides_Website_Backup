import ContactUs from "@/components/landing/contact-us";
import OurCustomers from "@/components/landing/our-customers";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
  {
    title: "Performance Marketing & SEO for Agri Brands",
    subtitle: "From Fields to Feeds — Grow Your Agri Brand Digitally",
    description: "We help agri brands generate leads, boost visibility, and scale growth through ROI-driven digital campaigns. Our performance marketing and SEO services are tailored to crop cycles, regional patterns, and farmer behaviour — ensuring every rupee delivers measurable outcomes.",
    href: "/services/performance-marketing-for-agri-brands",
    buttonText: "Know More",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 16L12 11L15 14L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 8H21V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Farmer Engagement Platform (Mass Audio & Omni-Channel)",
    subtitle: "Reach Millions — No Internet, No App Required",
    description: "Our mass audio conferencing and omni-channel communication platform enables brands to engage farmers at scale through audio calls, WhatsApp, SMS, and IVR. Ideal for training sessions, product demos, awareness drives, or field surveys — even in low-connectivity regions.",
    href: "/services/engagement",
    buttonText: "Read More",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
        <path d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z" fill="currentColor"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
      </svg>
    ),
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Agri Market Research & Campaign Execution",
    subtitle: "Know Your Audience. Act With Precision.",
    description: "We combine market research with digital campaign execution to help agri brands collect real insights while building awareness. Using surveys, feedback tools, and audience profiling, we help you understand farmer needs and launch data-backed communication campaigns.",
    href: "/services/market-research-for-agri-brands",
    buttonText: "Read More",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11 8V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 11H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    gradient: "from-orange-500 to-amber-500"
  }
];

const whyChooseDigicides = [
  "Built exclusively for agri & rural audiences",
  "Deep understanding of farmer communication behaviour",
  "Technology-first platforms with offline accessibility",
  "Data-driven campaign strategy & optimisation",
  "Multilingual communication capabilities",
  "Scalable solutions for brands of all sizes"
];

export const metadata = {
  title: "Agri Marketing Services for Rural India | Digicides",
  description: "Explore Digicides' performance marketing, farmer engagement, and market research services designed for agri brands to reach and engage rural audiences at scale.",
  alternates: {
    canonical: "https://www.digicides.com/services"
  },
  openGraph: {
    title: "Agri Marketing Services for Rural India | Digicides",
    description: "Explore Digicides' performance marketing, farmer engagement, and market research services designed for agri brands to reach and engage rural audiences at scale.",
    url: "https://www.digicides.com/services",
    siteName: "Digicides",
    locale: "en_IN",
    type: "website"
  }
};

export default function ServicesOverview() {
  return (
    <div className="flex flex-col overflow-x-hidden gap-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Agri Marketing Services for Rural India",
            "url": "https://www.digicides.com/services",
            "description": "Digicides provides performance marketing, farmer engagement, and market research services designed for agri brands to reach and engage rural audiences at scale.",
            "provider": {
              "@type": "Organization",
              "name": "Digicides",
              "url": "https://www.digicides.com/",
              "logo": "https://www.digicides.com/_next/image?url=%2FLogo.png&w=256&q=75",
              "description": "Digicides is an agri-focused digital marketing and SaaS-based communication company helping brands engage farmers across rural India."
            },
            "serviceType": "Agri Marketing Services",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Digicides Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Performance Marketing & SEO for Agri Brands",
                    "url": "https://www.digicides.com/services/performance-marketing-for-agri-brands",
                    "description": "ROI-driven performance marketing and SEO services tailored to agri brands using Google Ads, Meta Ads, SEO, and local optimization strategies."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Farmer Engagement Platform (Mass Audio & Omni-Channel)",
                    "url": "https://www.digicides.com/services/engagement",
                    "description": "Mass audio conferencing, WhatsApp automation, SMS campaigns, and IVR solutions for rural farmer communication and engagement."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Agri Market Research & Campaign Execution",
                    "url": "https://www.digicides.com/services/market-research-for-agri-brands",
                    "description": "Research-backed campaigns using farmer surveys, data collection, audience profiling, and real-time dashboards for insights and targeting."
                  }
                }
              ]
            }
          })
        }}
      />

      {/* Hero Section */}
      <section className="container relative flex flex-col items-center py-8 gap-2 text-center text-foreground">
        <h1 className="z-10 text-2xl font-normal tracking-tighter text-center text-muted-foreground sm:text-4xl lg:leading-[1.1]">
          Agri Marketing Services Built for Rural India
        </h1>
        <div className="flex flex-col items-center gap-4 md:gap-10 md:pt-12 pt-0">
          <h2 className="text-lg md:text-5xl text-center md:max-w-4xl font-normal tracking-tighter text-primary">
            Reach Farmers. Engage Smarter. Grow Faster.
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-regular mx-10 max-w-3xl text-muted-foreground">
            Digicides helps agri brands connect with rural audiences through digital, offline-first, and insight-led communication solutions. From performance marketing to mass audio engagement and research-driven campaigns — we deliver strategies that work where it matters most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="secondary"
              size="lg"
              className="w-fit text-md sm:text-xl h-[64px]"
            >
              <Link href="#services">
                Explore Services
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-fit text-md sm:text-xl h-[64px]"
            >
              <Link href="#contact-us">
                Talk to Our Team
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="size-full -mt-28">
        <OurCustomers />
      </div>

      {/* Introduction Section */}
      <section className="2xl:max-w-7xl max-w-5xl px-4 mx-auto">
        <h2 className="text-4xl font-medium text-medium text-center mb-8">
          End-to-End Marketing Solutions for Agri Brands
        </h2>
        <p className="text-[#212121]/60 text-center mb-8 max-w-4xl mx-auto">
          Agri marketing is changing fast — today&apos;s farmers use phones, social platforms, audio channels, and digital touchpoints to discover and trust brands.
        </p>
        <p className="text-[#212121]/60 text-center mb-12 max-w-4xl mx-auto">
          Digicides offers a complete suite of performance-driven, farmer-friendly marketing services designed specifically for rural India. Whether you want to generate leads, educate farmers, or understand your market — we help you reach the right audience with the right message.
        </p>
      </section>

      {/* Services Section */}
      <section id="services" className="w-full px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto 2xl:max-w-7xl max-w-5xl py-16">
          <h2 className="text-4xl font-medium text-medium text-center mb-4">
            Our Services
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Comprehensive solutions designed to help agri brands connect, engage, and grow in rural markets
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Gradient Header */}
                <div className={`h-2 bg-gradient-to-r ${service.gradient}`}></div>
                
                {/* Icon Circle */}
                <div className="p-8">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {service.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-base font-semibold text-primary mb-4">
                    {service.subtitle}
                  </p>
                  
                  <p className="text-[#212121]/70 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Button */}
                  <Link href={service.href}>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300"
                    >
                      {service.buttonText}
                      <svg 
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </Link>
                </div>

                {/* Decorative Elements */}
                <div className={`absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br ${service.gradient} rounded-full opacity-10 group-hover:scale-150 group-hover:opacity-20 transition-all duration-500`}></div>
              </div>
            ))}
          </div>

          {/* Additional Info Banner */}
          <div className="mt-16 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 text-center border border-orange-100">
            <h3 className="text-2xl font-semibold text-foreground mb-3">
              Need a Custom Solution?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We understand every agri brand has unique needs. Let&apos;s discuss how we can create a tailored marketing strategy for your business.
            </p>
            <Button
              variant="secondary"
              size="lg"
              className="w-fit"
            >
              <Link href="#contact-us">
                Schedule a Consultation
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Digicides */}
      <section className="2xl:max-w-7xl max-w-5xl px-4 mx-auto">
        <h2 className="text-4xl font-medium text-medium text-center mb-12">
          Why Agri Brands Choose Digicides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseDigicides.map((item, index) => (
            <div key={index} className="bg-[#FEF4E8] p-6 rounded-[15px] transition duration-300 flex items-start gap-3">
              <div className="bg-primary/10 rounded-full w-2 h-2 mt-2 flex-shrink-0"></div>
              <p className="text-[#212121] font-medium">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full px-4 bg-[#FEF4E8] py-16">
        <div className="container mx-auto max-w-5xl 2xl:max-w-7xl text-center">
          <h2 className="text-3xl md:text-5xl font-medium text-foreground mb-6">
            Ready to Grow Your Agri Brand?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Whether your goal is to engage farmers, gather insights, or scale your digital presence — Digicides helps you build meaningful conversations that create real impact.
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="w-fit text-md sm:text-xl h-[64px]"
          >
            <Link href="#contact-us">
              Let&apos;s Connect
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
