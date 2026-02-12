import ContactUs from "@/components/landing/contact-us";
import OurCustomers from "@/components/landing/our-customers";
import { RuralRewardCarousel } from "@/components/missed-call-solution/missed-call-solution-carousel";
import { SpeedVideo } from "@/components/missed-call-solution/speed-video";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const whyItWorks = [
  {
    title: "Farmers prefer missed calls",
    description: "No long forms to fill out"
  },
  {
    title: "Instant capture",
    description: "Phone number and location verified in seconds"
  },
  {
    title: "Automated follow-up",
    description: "WhatsApp, SMS, or IVR in regional languages"
  }
];

const keyFeatures = [
  {
    title: "Instant Data Capture",
    description: "Verified phone numbers and locations in seconds",
  },
  {
    title: "WhatsApp Integration",
    description: "Multimedia messages in 14 regional languages",
  },
  {
    title: "Survey Automation",
    description: "Collect structured crop & farm data",
  },
  {
    title: "Real-Time Reporting",
    description: "View farmer data as it comes in",
  },
  {
    title: "Scalable & Efficient",
    description: "Handles 100+ calls/minute, 24/7",
  },
  {
    title: "Missed Call + SMS + WhatsApp",
    description: "Full automation & multichannel",
  }
];

const howItWorksSteps = [
  {
    title: "Missed Call",
    description: "Farmer gives a missed call on your campaign number (virtual SIM-less)",
  },
  {
    title: "Instant Validation",
    description: "Phone number & location are captured and validated instantly",
  },
  {
    title: "Auto Communication",
    description: "Auto communication is sent in regional language via various communication channels",
  },
  {
    title: "Rich Data Collection",
    description: "BOT/Landing Page/Form collects rich information about the farmers which are extremely crucial for agri businesses",
  },
  {
    title: "Real-Time Dashboard",
    description: "Data appears in your dashboard in real-time for sales/field teams for real-time visibility",
  }
];

const supportingServices = [
  {
    title: "SMS",
    description: "Deliver links (informative, tutorial, promotional, etc.), OTPs, and coupon codes directly via SMS.",
  },
  {
    title: "WhatsApp",
    description: "Instantly reach farmers through WhatsApp/WhatsApp BOT to capture rich, interactive data.",
  },
  {
    title: "OBD/IVR",
    description: "Use recorded outbound calls to gauge interest and capture relevant inputs.",
  }
];

const whyChooseDigicides = [
  {
    title: "Deep agri market expertise",
    icon: "🧠"
  },
  {
    title: "Access to Digicides Data & Smart Targeting",
    icon: "📊"
  },
  {
    title: "Missed Call + Integrated Communication Channels and Mediums",
    icon: "🤖"
  },
  {
    title: "Regional language support",
    icon: "🌐"
  },
  {
    title: "Real-time insights for sales enablement",
    icon: "📈"
  }
];

export const metadata = {
  title: "Missed Call Solution for Agri Brands | Lead Capture Tool",
  description: "Generate verified leads from farmers using Digicides' Missed Call Solution. Automate WhatsApp follow-ups, capture data, and boost agri engagement.",
  alternates: {
    canonical: "https://www.digicides.com/product/missed-call-solution"
  },
  openGraph: {
    title: "Missed Call Solution for Agri Brands | Lead Capture Tool",
    description: "Generate verified leads from farmers using Digicides' Missed Call Solution. Automate WhatsApp follow-ups, capture data, and boost agri engagement.",
    url: "https://www.digicides.com/product/missed-call-solution",
    siteName: "Digicides",
    locale: "en_IN",
    type: "website"
  }
};

export default function MissedCallSolution() {
  return (
    <div className="flex flex-col overflow-x-hidden gap-20">
      <script type="application/ld+json">
        {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Missed Call Solution for Agri Brands | Lead Capture Tool",
              "description": "Generate verified leads from farmers using Digicides' Missed Call Solution. Automate WhatsApp follow-ups, capture data, and boost agri engagement.",
              "url": "https://www.digicides.com/product/missed-call-solution"
            }
          `}
      </script>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Missed Call Solution for Agri Lead Generation",
            provider: {
              "@type": "Organization",
              name: "Digicides Marketing Services Pvt. Ltd."
            },
            areaServed: {
              "@type": "Country",
              name: "India"
            },
            description: "Generate verified leads from farmers using Digicides' Missed Call Solution. Automate WhatsApp follow-ups, capture data, and boost agri engagement."
          })
        }}
      />
      
      {/* Header Section (Hero) */}
      <section className="container relative flex flex-col items-center py-8 gap-2 text-center text-foreground">
        <h1 className="z-10 text-2xl font-normal tracking-tighter text-center text-muted-foreground sm:text-4xl lg:leading-[1.1]">
          Missed Call Solution for Agri Lead Generation
        </h1>
        <div className="block xl:hidden h-[250px]">
          <RuralRewardCarousel />
        </div>
        <div className="flex flex-row md:gap-8 md:pt-12 pt-0">
          <div className="flex w-fit flex-col xl:justify-start items-center xl:items-start gap-4 md:gap-10 md:pt-12 pt-0">
            <h2 className="text-lg md:text-5xl text-center md:text-left md:max-w-xl font-normal tracking-tighter text-primary">
              The Best Lead Generation Tool - Start Offline. Engage Online. Deliver Results.
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-regular mx-10 max-w-2xl text-muted-foreground lg:mx-0 lg:text-left xl:mx-0 xl:text-left">
              Turn a missed call into a conversation. Collect leads, validate farmer data, and start rich communication.
            </p>
            <Button
              variant="secondary"
              size="lg"
              className="w-fit text-md sm:text-xl h-[64px]"
            >
              <Link href="#contact-us">
                Try a Demo
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

      {/* Section 1: What It Does */}
      <section className="2xl:max-w-7xl max-w-5xl px-4 mx-auto">
        <h2 className="text-4xl font-medium text-medium text-center mb-8">
          Why Missed Call Solution Works for Agri Marketing
        </h2>
        <p className="text-[#212121]/60 text-center mb-8">
          Farmers don&apos;t fill out long forms—they prefer a missed call.
        </p>
        <p className="text-[#212121]/60 text-center mb-8">
          Unlike traditional form-filling, door-to-door surveys, or app-based campaigns, our missed call platform instantly captures the farmer&apos;s number and location. It then triggers follow-up via WhatsApp, SMS, or IVR in the farmer&apos;s preferred regional language—automatically.
        </p>
        <p className="text-[#212121]/60 text-center mb-12">
          Whether your goal is lead generation, survey data collection, or field team activation, DigiTrack helps you do it faster, cheaper, and more reliably.
        </p>

        <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-1">
          {/* Image on Left */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-200 to-amber-200 rounded-2xl opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <Image
                src="/missed-call-solution/visual-idea.jpg"
                alt="Missed Call Solution Workflow"
                width={500}
                height={400}
                className="relative rounded-xl w-full max-w-[300px] lg:max-w-[400px] shadow-lg object-cover"
              />
            </div>
          </div>

          {/* Features on Right */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 gap-5">
            {whyItWorks.map((content, index) => (
              <div
                key={index}
                className="bg-[#FEF4E8] p-6 rounded-[15px] transition duration-300 hover:shadow-md">
                <h4 className="text-lg font-semibold text-[#212121] mb-3">
                  {content.title}
                </h4>
                <p className="text-[#212121]/60">{content.description}</p>
              </div>
            ))}
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
      <section className="w-full px-4 bg-white">
        <div className="container mx-auto 2xl:max-w-7xl max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-medium text-medium text-center mb-12">
              How the Missed Call Lead Capture System Works
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
            <SpeedVideo
              src="/missed-call-solution/how-it-works.mp4"
              width={800}
              height={400}
              className="aspect-[2/1] w-[480px] xl:w-[600px] h-[320px] xl:h-[413px] object-cover rounded-2xl shadow-md"
              speed={1.5}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    <path d="M16.126 2.20215H8.126C3.71 2.20215 1.376 4.53615 1.376 8.95166L1.375 13.9517C1.375 19.5728 3.958 20.7022 8.125 20.7022H8.62207C8.69732 20.7182 8.76744 20.7525 8.82617 20.8023L10.3262 22.8023C10.5243 23.0977 10.7922 23.3398 11.1061 23.5072C11.42 23.6746 11.7702 23.7622 12.126 23.7622C12.4817 23.7622 12.832 23.6746 13.1459 23.5072C13.4598 23.3398 13.7276 23.0977 13.9258 22.8023L15.4268 20.8018C15.4499 20.7708 15.48 20.7457 15.5146 20.7284C15.5492 20.7111 15.5873 20.7021 15.626 20.7022H16.125C20.541 20.7022 22.875 18.3682 22.875 13.9526L22.876 8.95264C22.876 4.53659 20.542 2.20215 16.126 2.20215ZM21.375 13.9526C21.375 17.5342 19.707 19.2022 16.125 19.2022H15.626C15.3545 19.2028 15.0869 19.2663 14.8441 19.3877C14.6013 19.5091 14.3899 19.6851 14.2266 19.9019L12.7266 21.9019C12.6661 22.0078 12.5787 22.0958 12.4732 22.157C12.3677 22.2182 12.248 22.2505 12.126 22.2505C12.004 22.2505 11.8843 22.2182 11.7788 22.157C11.6733 22.0958 11.5859 22.0078 11.5254 21.9019L10.0254 19.9019C9.85702 19.6905 9.64459 19.5185 9.4029 19.3976C9.16122 19.2768 8.8961 19.2101 8.626 19.2022H8.125C4.42285 19.2022 2.875 18.4727 2.875 13.9517L2.876 8.95166C2.876 5.37012 4.544 3.70215 8.126 3.70215H16.126C19.708 3.70215 21.376 5.37061 21.376 8.95264L21.375 13.9526ZM13.126 11.9521C13.1264 12.0833 13.1008 12.2133 13.0509 12.3346C13.001 12.4559 12.9276 12.5661 12.835 12.659C12.7423 12.7519 12.6323 12.8256 12.5111 12.8759C12.39 12.9262 12.2601 12.9521 12.1289 12.9521H12.1231C11.9254 12.9516 11.7324 12.8924 11.5683 12.7822C11.4042 12.672 11.2765 12.5156 11.2013 12.3328C11.126 12.15 11.1067 11.9491 11.1456 11.7553C11.1845 11.5615 11.28 11.3836 11.4199 11.244C11.5599 11.1045 11.7381 11.0095 11.932 10.9712C12.1259 10.9328 12.3268 10.9528 12.5094 11.0286C12.6919 11.1043 12.8479 11.2325 12.9577 11.3969C13.0674 11.5613 13.126 11.7545 13.126 11.9521ZM17.126 11.9521C17.1264 12.0833 17.1008 12.2133 17.0509 12.3346C17.001 12.4559 16.9276 12.5661 16.835 12.659C16.7423 12.7519 16.6323 12.8256 16.5111 12.8759C16.39 12.9262 16.2601 12.9521 16.1289 12.9521H16.1231C15.9254 12.9516 15.7324 12.8924 15.5683 12.7822C15.4042 12.672 15.2765 12.5156 15.2013 12.3328C15.126 12.15 15.1067 11.9491 15.1456 11.7553C15.1845 11.5615 15.28 11.3836 15.4199 11.244C15.5599 11.1045 15.7381 11.0095 15.932 10.9712C16.1259 10.9328 16.3268 10.9528 16.5094 11.0286C16.6919 11.1043 16.8479 11.2325 16.9577 11.3969C17.0674 11.5613 17.126 11.7545 17.126 11.9521ZM9.126 11.9521C9.12636 12.0833 9.10084 12.2133 9.0509 12.3346C9.00096 12.4559 8.92757 12.5661 8.83495 12.659C8.74233 12.7519 8.6323 12.8256 8.51114 12.8759C8.38999 12.9262 8.26011 12.9521 8.12893 12.9521H8.12307C7.92541 12.9516 7.73236 12.8924 7.5683 12.7822C7.40424 12.672 7.27652 12.5156 7.20128 12.3328C7.12604 12.15 7.10666 11.9491 7.14557 11.7553C7.18449 11.5615 7.27996 11.3836 7.41993 11.244C7.5599 11.1045 7.73808 11.0095 7.93198 10.9712C8.12589 10.9328 8.3268 10.9528 8.50936 11.0286C8.69191 11.1043 8.84792 11.2325 8.95767 11.3969C9.06742 11.5613 9.126 11.7545 9.126 11.9521Z" fill="black" />
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
                  An agri brand needed to capture large volumes of verified farmer leads quickly, but faced low connectivity, slow manual data collection, and poor response rates.
                </p>
              </div>

              <div className="bg-[#FEF4E8] p-6 rounded-lg">
                <h4 className="text-lg font-medium text-foreground mb-2">Solution</h4>
                <p className="text-muted-foreground">
                  Launched a missed call campaign that auto-captured phone numbers and locations, then triggered WhatsApp surveys in local languages. Field teams received real-time data for instant follow-up.
                </p>
              </div>

              <div className="bg-[#FEF4E8] p-6 rounded-lg">
                <h4 className="text-lg font-medium text-foreground mb-2">Result</h4>
                <p className="text-muted-foreground mb-2">
                  <strong className="text-foreground">20,000+</strong> captures in 7 days
                </p>
                <p className="text-muted-foreground mb-2">
                  <strong className="text-foreground">75%</strong> WhatsApp survey response rate
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">60%</strong> jump in field visits from instant lead sharing
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Digicides */}
      <section className="2xl:max-w-7xl max-w-5xl px-4 mx-auto">
        <h2 className="text-4xl font-medium text-medium text-center mb-12">
          Why Choose Digicides
        </h2>
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
            Ready to Generate Verified Farmer Leads?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Let&apos;s turn every missed call into a real opportunity.
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