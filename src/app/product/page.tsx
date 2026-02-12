import ContactUs from "@/components/landing/contact-us";
import OurCustomers from "@/components/landing/our-customers";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    title: "Rural Reward",
    subtitle: "Loyalty, Rewards & Lucky Draw Platform",
    description: "Reward Farmers & Retailers. Track Results. Boost Sales.",
    longDescription: "Rural Reward is a complete loyalty and lucky draw platform designed for agricultural brands. It helps you run points-based loyalty programs, coupon validations, retailer incentives, and farmer lucky draws — all with real-time tracking, alerts, and performance dashboards.",
    href: "/product/rural-reward",
    image: "/rural-reward/rural-reward-hero-1.jpg"
  },
  {
    title: "Missed Call Solution",
    subtitle: "Lead Capture & Farmer Data Collection",
    description: "Start Offline. Engage Online. Deliver Verified Leads.",
    longDescription: "Our Missed Call Solution (DigiTrack) converts every missed call into a validated lead. Built specifically for rural India, it automates phone-number capture, location validation, and follow-up via WhatsApp, SMS, or IVR — helping agri brands generate high-quality leads at scale.",
    href: "/product/missed-call-solution",
    image: "/missed-call-solution/missed-call-solution-hero-1.jpg"
  },
  {
    title: "Agri Analytics Platform",
    subtitle: "Real-Time Agri Intelligence Dashboard",
    description: "Turn Farmer & Retailer Interactions Into Actionable Insights",
    longDescription: "Our Agri Analytics Platform gives brands full-funnel visibility — from lead generation to farmer engagement and retail-level performance. Designed for the agri ecosystem, it brings together data from missed calls, WhatsApp, SMS, IVR, and campaign touchpoints into one unified dashboard.",
    href: "/product/analytics",
    image: "/analytics/analytics-hero-1.jpg"
  }
];

const whyChooseDigicides = [
  {
    title: "Built specifically for rural India",
    description: "Deep understanding of rural markets and farmer behavior"
  },
  {
    title: "Offline-first + digital-ready architecture",
    description: "Works seamlessly in low connectivity areas"
  },
  {
    title: "Full multi-language support",
    description: "Communicate in 14+ regional languages"
  },
  {
    title: "Real-time dashboards & performance insights",
    description: "Track campaigns and measure ROI instantly"
  },
  {
    title: "Scalable for large campaigns & nationwide programs",
    description: "Handle millions of interactions effortlessly"
  },
  {
    title: "Unified ecosystem for engagement, rewards & analytics",
    description: "One platform for all your agri marketing needs"
  }
];

export const metadata = {
  title: "Agri Marketing Products for Rural Engagement | Digicides",
  description: "Explore Digicides' Rural Reward, Missed Call Solution, and Agri Analytics products — built to help agri brands engage farmers, capture leads, and measure performance.",
  alternates: {
    canonical: "https://www.digicides.com/product"
  },
  openGraph: {
    title: "Agri Marketing Products for Rural Engagement | Digicides",
    description: "Explore Digicides' Rural Reward, Missed Call Solution, and Agri Analytics products — built to help agri brands engage farmers, capture leads, and measure performance.",
    url: "https://www.digicides.com/product",
    siteName: "Digicides",
    locale: "en_IN",
    type: "website"
  }
};

export default function ProductsOverview() {
  return (
    <div className="flex flex-col overflow-x-hidden gap-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Agri Communication & Engagement Products",
            "url": "https://www.digicides.com/product",
            "description": "Explore Digicides' Rural Reward, Missed Call Solution, and Agri Analytics products designed for agri brands to engage farmers, capture leads, run reward programs, and analyze performance.",
            "brand": {
              "@type": "Organization",
              "name": "Digicides",
              "url": "https://www.digicides.com/",
              "logo": "https://www.digicides.com/_next/image?url=%2FLogo.png&w=256&q=75"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Digicides Product Suite",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Rural Reward – Loyalty, Rewards & Lucky Draw Platform",
                    "url": "https://www.digicides.com/product/rural-reward",
                    "description": "A complete loyalty and lucky draw platform for agri brands to reward farmers and retailers with real-time tracking, performance dashboards, alerts, and multi-SKU support."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Missed Call Solution – Lead Capture & Farmer Data Collection",
                    "url": "https://www.digicides.com/product/missed-call-solution",
                    "description": "A powerful missed call platform that captures verified farmer leads, auto-validates data, launches WhatsApp BOTs, and provides real-time lead visibility for field teams."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Agri Analytics Platform – Real-Time Agri Intelligence Dashboard",
                    "url": "https://www.digicides.com/product/analytics",
                    "description": "A full-funnel agri analytics platform that tracks leads, engagement, retail performance, and product adoption with real-time dashboards and multi-layer filtering."
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
          Agri Communication & Engagement Products for Rural India
        </h1>
        <div className="flex flex-col items-center gap-4 md:gap-10 md:pt-12 pt-0">
          <h2 className="text-lg md:text-5xl text-center md:max-w-4xl font-normal tracking-tighter text-primary">
            Connect, Engage & Grow With Smart Agri Marketing Technology
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-regular mx-10 max-w-3xl text-muted-foreground">
            Digicides offers a suite of powerful, offline-first and digital-ready products designed to help agri brands engage farmers, run reward programs, capture leads, and analyse performance — all from one unified ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="secondary"
              size="lg"
              className="w-fit text-md sm:text-xl h-[64px]"
            >
              <Link href="#products">
                Explore Products
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-fit text-md sm:text-xl h-[64px]"
            >
              <Link href="#contact-us">
                Request a Demo
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
          Technology That Powers Agri Brand Engagement
        </h2>
        <p className="text-[#212121]/60 text-center mb-8 max-w-4xl mx-auto">
          Reaching and understanding rural audiences requires more than traditional marketing. Our products are built to simplify communication, strengthen retailer and farmer relationships, and give agri brands complete visibility across their campaigns.
        </p>
        <p className="text-[#212121]/60 text-center mb-12 max-w-4xl mx-auto">
          From loyalty platforms to missed call automation and real-time analytics — each product is designed to deliver measurable impact for rural India.
        </p>
      </section>

      {/* Products Section */}
      <section id="products" className="w-full px-4">
        <div className="container mx-auto 2xl:max-w-7xl max-w-5xl">
          <h2 className="text-4xl font-medium text-medium text-center mb-12">
            Our Products
          </h2>

          <div className="grid grid-cols-1 gap-12">
            {products.map((product, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-8 lg:gap-12`}
              >
                {/* Product Image */}
                <div className="w-full lg:w-1/2 flex justify-center">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-200 to-amber-200 rounded-2xl opacity-25 group-hover:opacity-40 transition duration-300"></div>
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={500}
                      height={350}
                      className="relative rounded-xl w-full max-w-[500px] shadow-lg object-cover"
                      priority={index === 0}
                    />
                  </div>
                </div>

                {/* Product Content */}
                <div className="w-full lg:w-1/2 flex flex-col gap-4">
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
                    {product.title}
                  </h3>
                  <p className="text-lg font-medium text-muted-foreground">
                    {product.subtitle}
                  </p>
                  <p className="text-xl font-semibold text-primary mb-2">
                    {product.description}
                  </p>
                  <p className="text-[#212121]/60 mb-4">
                    {product.longDescription}
                  </p>
                  <div>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-fit"
                      asChild
                    >
                      <Link href={product.href}>
                        Know More
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Digicides */}
      <section className="w-full px-4 bg-[#FEF4E8] py-16">
        <div className="container mx-auto 2xl:max-w-7xl max-w-5xl">
          <h2 className="text-4xl font-medium text-medium text-center mb-12">
            Why Agri Brands Choose Digicides Products
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px]">
            {whyChooseDigicides.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-[15px] transition duration-300 hover:shadow-md"
              >
                <h4 className="text-lg font-semibold text-[#212121] mb-3">
                  {item.title}
                </h4>
                <p className="text-[#212121]/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Ecosystem Visual */}
      <section className="2xl:max-w-7xl max-w-5xl px-4 mx-auto">
        <h2 className="text-4xl font-medium text-medium text-center mb-12">
          A Unified Ecosystem
        </h2>
        <p className="text-[#212121]/60 text-center mb-12 max-w-3xl mx-auto">
          All three products work together seamlessly to create a complete agri marketing solution. Capture leads with Missed Call Solution, reward farmers with Rural Reward, and measure everything with Agri Analytics Platform.
        </p>

        <div className="bg-[#FEF4E8] p-8 md:p-12 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
                <span className="text-4xl">📞</span>
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Capture
              </h4>
              <p className="text-[#212121]/60 text-sm">
                Generate verified leads through missed calls
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
                <span className="text-4xl">🎁</span>
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Engage
              </h4>
              <p className="text-[#212121]/60 text-sm">
                Reward and retain farmers with loyalty programs
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
                <span className="text-4xl">📊</span>
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Measure
              </h4>
              <p className="text-[#212121]/60 text-sm">
                Track performance with real-time analytics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full px-4 py-16">
        <div className="container mx-auto max-w-5xl 2xl:max-w-7xl text-center">
          <h2 className="text-3xl md:text-5xl font-medium text-foreground mb-6">
            Ready to Build a Stronger Farmer Engagement Ecosystem?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Whether you need to reward farmers, generate verified leads, or measure performance — Digicides provides the right tools to help your agri brand grow with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              className="w-fit text-md sm:text-xl h-[64px]"
            >
              <Link href="#contact-us">
                Request a Demo
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-fit text-md sm:text-xl h-[64px]"
            >
              <Link href="#contact-us">
                Let&apos;s Connect
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="contact-us" className="-mt-24 md:-mt-44">
        <ContactUs />
      </section>
    </div>
  );
}