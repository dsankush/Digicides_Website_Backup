import ContactUs from "@/components/landing/contact-us";
import HowDoWeDo from "@/components/landing/how-do-we-do";
import OurCustomers from "@/components/landing/our-customers";
import WhatDoWeDo from "@/components/landing/what-do-we-do";
import WhatOurCustomerTell from "@/components/landing/what-our-customer-tell";
import WhyChooseUs from "@/components/landing/why-choose-us";
import Hero from "./_components/Hero";

const HomePage = () => {
  return (
    <main className="flex flex-col items-center justify-start pt-24 text-white">
      <Hero />
      <WhatDoWeDo />
      <HowDoWeDo />
      <WhyChooseUs />
      <WhatOurCustomerTell />
      <OurCustomers />
      <ContactUs />
    </main>
  );
};

export default HomePage;
