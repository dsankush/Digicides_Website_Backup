"use client";
import "./css/embla.css";
import EmblaCarousel from "./jss/EmblaCarousel";


const steps = [
  {
    description: 
    "“Impressed by Digicides creativity, professionalism, and results-driven approach. A true partner for digital success! ",
    description2:
    "Their team is passionate, knowledgeable, and dedicated to delivering top-notch digital experiences. Coromandel is delighted to work with them.“",
    role: "Marketing Manager",
    company: "Coromandel International Ltd.",
  },
  {
    description:
      "“Digicides has been a reliable partner in our digital outreach efforts, helping us streamline farmer engagement through WhatsApp, missed call campaigns, and other digital initiatives.",
    description2:
      "We've seen meaningful improvements in reach and engagement, and appreciate their practical approach to digital solutions.”",
    role: "Digital Marketing Manager,",
    company: "East-West Seed India",
  },
  {
    description:
      "“At Bioseed, we have been utilizing Digicides' SMS and OBD services, and we are extremely satisfied with the results. Their SMS solutions have allowed us to communicate effectively with our customers, ensuring timely updates and engagement.",
    description2:
      "The OBD services have further enhanced our outreach, enabling us to deliver personalized and impactful messages. Digicides' platform is seamless, reliable, and efficient, making it an invaluable tool for our communication needs. We appreciate their excellent service and highly recommend them to businesses looking for effective digital communication solutions.“",
    role: "Marketing(Branding & Demand Activation)",
    company: "Shriram Bioseed",
  },
  {
    description:
      "“We sincerely appreciate your commitment to quality, timely delivery and customer satisfaction has been truly commendable. The seamless communication and attention to detail have made our experience with Digicides both productive and enjoyable. We value this partnership and look forward to future opportunities to work together. Thank you for your dedication and outstanding service!“",
    description2:
    "The seamless communication and attention to detail have made our experience with Digicides both productive and enjoyable. We value this partnership and look forward to future opportunities to work together. Thank you for your dedication and outstanding service!",
    role: "Marketing Coordinator,",
    company: "Shivashakti Group of Companies",
  },
  {
    description:
    "“Digicides provide innovative tools and access to a vast farmer network, which significantly helped us connect with farmers and generate valuable leads. Their data-driven solutions had a noticeable impact on our outreach efforts.",
    description2:
    "While there is room for improvement in areas like user interface intuitiveness, our overall experience working with them was positive. Digicides is a strong partner for agri-businesses and has great potential to enhance its platform further.",
    role: "Project Manager",
    company: "INERA",
  },
  {
    description:
    "“Digicide has been our trusted digital agency for the past three years, consistently delivering impactful campaigns that enhance our customer engagement. From running WhatsApp campaigns and Kisan Call initiatives to implementing WhatsApp push notifications, their strategies have significantly improved our ability to connect with customers and drive demand.“",
    description2:
    "Every interaction with their team, especially with Ms. Nikita Ji (Digicide), has been seamless, efficient, and professional. Their expertise and commitment to excellence make them a valuable partner in our digital outreach efforts.",
    role: "Manager - Digital and Social Media Communication",
    company: "SMl Limited",
  },
  {
    description:
    "“We partnered with Digicides for our WhatsApp marketing initiatives, and the experience has been exceptional. Their expertise in the agri sector, coupled with a robust dashboarding solution, allowed us to efficiently monitor and optimize our WhatsApp campaigns in real-time. Their dedicated support team ensured smooth campaign execution. Digicides has truly added value to our digital outreach efforts, making them a reliable partner for us.“",
    description2:
    "We value this partnership and look forward to future opportunities to work together. Thank you for your dedication and outstanding service!“",
    role: "Deputy Manager- Strategic Marketing",
    company: "Crystal Crop Protection"
  }
];

export default function TestingCarousel() {
  return (
    <div className="relative">
      {/* <ProgressiveBlur
        className="pointer-events-none absolute -left-0 top-[0%] z-[50] h-[500px] w-[200px] hidden sm:block md:block lg:block xl:block"
        direction="left"
        blurIntensity={1}
      />
      <ProgressiveBlur
        className="pointer-events-none absolute -right-0 top-[0%] z-[50] h-[500px] w-[200px] hidden sm:block md:block lg:block xl:block"
        direction="right"
        blurIntensity={1}
      /> */}
      <EmblaCarousel steps={steps} />
    </div>
  );
}
