import ContactUs from "@/components/landing/contact-us";
import OurCustomers from "@/components/landing/our-customers";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const keyFeatures = [
  {
    title: "📞 Mass Audio Conferencing",
    description: "Connect with up to 25,000 participants live through scalable, high-quality audio sessions—ideal for mass outreach.",
  },
  {
    title: "🔁 Two-Way Audio Interaction",
    description: "Enable real-time dialogue—farmers can ask questions or respond, making communication interactive and engaging.",
  },
  {
    title: "📶 No App or Internet Required",
    description: "Accessible on any basic phone. Farmers simply receive an incoming call—no smartphone or internet needed.",
  },
  {
    title: "🗣️ Regional Language Support",
    description: "Communicate seamlessly in 14+ Indian languages, ensuring clarity and comfort for every customer",
  },
  {
    title: "📊 Real-Time Analytics Dashboard",
    description: "Track participation, drop-offs, engagement levels, and responses—monitor impact as it happens.",
  },
  {
    title: "📬 SMS & WhatsApp Integration",
    description: "Send pre-call reminders via SMS, and follow-up with voice notes, links, or updates on WhatsApp to extend engagement.",
  },
  {
    title: "📞 IVR Feedback Collection",
    description: "Capture feedback and insights post-call through simple keypad responses—directly from the field.",
  },
  {
    title: "📢 Social Media Engagement",
    description: "Leverage platforms like Facebook, Google, Instagram, and YouTube to extend your campaign's reach, build stronger brand connections and create meaningful touchpoints with rural customers",
  },
  {
    title: "🎯 Versatile Use Cases",
    description: "Perfect for product education, surveys, trainings, market research, and campaign launches—tailored to rural needs.",
  }
];

// How It Works steps
const howItWorksSteps = [
  {
    title: "Dial-Out Conference Initiated",
    description: "Farmers receive automated call invites",
  },
  {
    title: "Instant Joining",
    description: "One keypress connects them to the live session",
  },
  {
    title: "Live Audio Broadcast",
    description: "Experts or brand managers speak",
  },
  {
    title: "Two-Way Engagement",
    description: "Farmers ask questions or give feedback",
  },
  {
    title: "Analytics Dashboard",
    description: "Track participation & response trends live",
  }
];

// Why Choose Digicides
const whyChooseDigicides = [
  {
    title: "🧠 Expertise in rural marketing & farmer behavior",
  },
  {
    title: "📞 Easy-to-launch audio teleconferencing with zero learning curve",
  },
  {
    title: "📊 Live engagement insights to improve targeting",
  },
  {
    title: "⚙️ Scalable for campaigns, events, or conference calls for training",
  },
  {
    title: "💬 Complete language localization with analytics",
  }
];

export const metadata = {
  title: "Audio Conferencing Platform for Agri Brands | Digicides",
  description: "Engage 25,000+ farmers with live audio conferencing—no internet or app needed. Run multilingual product demos, surveys, and training with Digicides.",
  alternates: {
    canonical: "https://www.digicides.com/services/engagement"
  },
  openGraph: {
    title: "Audio Conferencing Platform for Agri Brands | Digicides",
    description: "Engage 25,000+ farmers with live audio conferencing—no internet or app needed. Run multilingual product demos, surveys, and training with Digicides.",
    url: "https://www.digicides.com/services/engagement",
    siteName: "Digicides",
    locale: "en_IN",
    type: "website"
  }
};

export default function EngagementPage() {
  return (
    <div className="flex flex-col overflow-x-hidden max-w-7xl mx-auto gap-20">
      <script type="application/ld+json">
        {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Audio Conferencing Platform for Agri Brands | Digicides",
              "description": "Engage 25,000+ farmers with live audio conferencing—no internet or app needed. Run multilingual product demos, surveys, and training with Digicides.",
              "url": "https://www.digicides.com/services/engagement"
            }
          `}
      </script>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Audio Conferencing Platform for Agri Brands | Digicides",
            provider: {
              "@type": "Organization",
              name: "Digicides Marketing Services Pvt. Ltd."
            },
            areaServed: {
              "@type": "Country",
              name: "India"
            },
            description: "Engage 25,000+ farmers with live audio conferencing—no internet or app needed. Run multilingual product demos, surveys, and training with Digicides."
          })
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-12 px-4 sm:px-6 lg:px-8">
        <h1 className="z-10 text-2xl font-normal tracking-tighter text-center text-muted-foreground sm:text-4xl lg:leading-[1.1]">
          Audio Conferencing & Omni-Channel Platform for Farmer Outreach
        </h1>
        <div className="flex md:flex-row flex-col-reverse md:gap-8 md:pt-12 pt-0">
          <div className="flex w-fit flex-col xl:justify-start items-center xl:items-start gap-4 md:gap-10 md:pt-12 pt-0">
            <h2 className="text-lg md:text-6xl text-center md:text-left md:max-w-2xl font-normal tracking-tighter text-primary">
              Unifying Communication Channels for Farmer
              Engagement
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-regular mx-10 max-w-2xl text-muted-foreground lg:mx-0 lg:text-left xl:mx-0 xl:text-left">
              Connect with rural audiences—even without internet. Our omni-channel suite enables mass audio conferencing calls, SMS blasts, WhatsApp campaigns, and IVR-based feedback journeys.
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
          <div className="block">
            <div className="right-0">
              {/* Placeholder for visual - you can add the actual image later */}
              <div className="w-full md:w-[500px] px-12 py-6 md:px-0 h-full md:h-[400px] rounded-lg flex items-center justify-center">
                <Image
                  src="/engagement/hero.png"
                  alt="Engagement"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Trust Logos */}
      <section className="w-full px-2 sm:px-4 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] ">
        <OurCustomers />
      </section>

      {/* What It Does */}
      <section className="w-full px-4 mx-auto">
        <h2 className="text-4xl font-medium text-medium text-center mb-12">
          What It Does
        </h2>
        <p className="text-[#212121]/60 text-center mb-8">
          It enables brands and organizations to effectively reach, engage, and collect feedback from rural and farming communities using simple, accessible communication channels—like audio calls, SMS, WhatsApp, and IVR—even without internet access.
        </p>
        <div className="md:mt-6 mt-12 flex justify-center">
          {/* Placeholder for visual - you can add the actual image later */}
          <div className="w-[480px] xl:w-[600px] h-[320px] xl:h-[413px] rounded-lg flex items-center justify-center">
            <Image
              src="/engagement/does.png"
              alt="Engagement"
              width={600}
              height={400}
            />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
          It helps you:
        </h3>
        <div className="grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[15px]">
          <div className="bg-[#FEF4E8] w-full px-6 rounded-[15px] transition flex flex-col justify-center items-center gap-4 py-8 duration-300">
            <div className="text-4xl">📞</div>
            <p className="text-[#212121] text-center text-wrap">
              Broadcast important messages at scale via mass audio calls
            </p>
          </div>
          <div className="bg-[#FEF4E8] w-full px-6 rounded-[15px] transition flex flex-col justify-center items-center gap-4 py-8 duration-300">
            <div className="text-4xl">📱</div>
            <p className="text-[#212121] text-center text-wrap">
              Notify and follow up with farmers through SMS and WhatsApp
            </p>
          </div>
          <div className="bg-[#FEF4E8] w-full px-6 rounded-[15px] transition flex flex-col justify-center items-center gap-4 py-8 duration-300">
            <div className="text-4xl">🎤</div>
            <p className="text-[#212121] text-center text-wrap">
              Host two-way sessions on basic phones
            </p>
          </div>
          <div className="bg-[#FEF4E8] w-full px-6 rounded-[15px] transition flex flex-col justify-center items-center gap-4 py-8 duration-300">
            <div className="text-4xl">📊</div>
            <p className="text-[#212121] text-center text-wrap">
              Collect real-time feedback using IVR, driving smarter outreach
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="2xl:max-w-7xl max-w-5xl px-4 mx-auto">
        <h2 className="text-4xl font-medium text-medium text-center mb-12">
          Key Features
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

      {/* How It Works */}
      <section className="w-full px-2 sm:px-4">
        <div className="container mx-auto 2xl:max-w-7xl max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-medium text-medium text-center mb-4">
              How It Works
            </h2>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              How Our Mass Audio Engagement which we call &quot;DigiNews&quot; Platform Operates:
            </h3>
            <p className="text-[#212121]/60 mb-8">
              Connect with Up to 25,000 Farmers in Real-Time
            </p>
            <p className="text-[#212121]/60 mb-8">
              Run large-scale audio conference calls without the internet. Our audio conferencing system enables brands to host two-way sessions that educate, engage, and activate rural audiences using just basic phones.
            </p>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Why Our Audio Conference Platform Works in Rural India
            </h4>
            <p className="text-[#212121]/60 mb-8">
              Not every farmer has a smartphone, but they all have a phone. Our audio bridge technology allows brands to conduct real-time communication at scale—no app, no data, no complexity.
            </p>
            <p className="text-[#212121]/60 mb-8">
              Whether it&apos;s a training, a virtual product demo, or a feedback session—conference calls help you connect with even the most remote communities.
            </p>
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

            <div className="md:mt-6 mt-12 flex justify-center">
              {/* Placeholder for visual - you can add the actual image later */}
              <div className="w-[480px] xl:w-[600px] h-[320px] xl:h-[413px] rounded-lg flex items-center justify-center">
                <Image
                  src="/engagement/works.png"
                  alt="Engagement"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Digicides */}
      <section className="2xl:max-w-7xl max-w-5xl px-4 mx-auto">
        <h2 className="text-4xl font-medium text-medium text-center mb-12">
          Why Agri Brands Trust Our Platform
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px]">
          {whyChooseDigicides.map((reason, index) => (
            <div key={index} className="bg-[#FEF4E8] p-6 rounded-[15px] transition flex flex-col justify-center items-center gap-4 py-8 duration-300">
              <p className="text-[#212121] text-center">
                {reason.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Case Study */}
      <section className="w-full px-2 sm:px-4">
        <div className="container mx-auto max-w-5xl 2xl:max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-medium text-medium text-center mb-12">
              Farmer Awareness Campaign for Crop Protection Product
            </h2>
          </div>

          <div className="overflow-hidden">
            <div className="">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-3 rounded-lg">
                  <h4 className="text-lg font-medium text-foreground mb-2">Problem:</h4>
                  <p className="text-muted-foreground">Low smartphone penetration and poor data access made it hard to educate farmers across 7 states about safe chemical usage.</p>
                </div>

                <div className="bg-white p-3 rounded-lg">
                  <h4 className="text-lg font-medium text-foreground mb-2">Solution:</h4>
                  <p className="text-muted-foreground">We launched multilingual audio conference calls reaching out to farmers via basic phones, delivering voice-based training live.</p>
                </div>

                <div className="bg-white p-3 rounded-lg">
                  <h4 className="text-lg font-medium text-foreground mb-2">Result:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="text-primary mr-2">📞</span>
                      <span className="text-muted-foreground">21,000 farmers joined across 10 days</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-primary mr-2">🌐</span>
                      <span className="text-muted-foreground">5 languages used, ensuring regional relevance</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-primary mr-2">📈</span>
                      <span className="text-muted-foreground">63% requested follow-ups through local dealers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="2xl:max-w-7xl max-w-5xl px-4 mx-auto text-center">
        <h2 className="text-4xl font-medium text-medium text-center mb-8">
          Ready to Speak with Thousands—Instantly?
        </h2>
        <p className="text-lg text-muted-foreground">
          Run your next product launch, training, or survey through powerful, real-time audio conferencing software—no apps, no barriers.
        </p>
      </section>

      {/* Contact Us */}
      <section id="contact-us" className="-mt-32 md:-mt-52">
        <ContactUs />
      </section>
    </div>
  );
} 