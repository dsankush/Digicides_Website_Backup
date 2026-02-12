import MeetOurTeam from "@/components/meet-our-team";
import Image from "next/image";

export const generateMetadata = () => {
  return {
    title: "About Us | Digicides",
    description:
      "Learn more about Digicides Marketing Services Pvt. Ltd., a SaaS-driven communication platform for the agri industry.",
    alternates: {
      canonical: "https://www.digicides.com/about",
    },
  };
};

export default function AboutPage() {
  return (
    <>
      <div className="z-10 flex w-full flex-col items-center justify-start gap-8 px-4 pt-20 text-foreground sm:pt-32 md:px-24 md:pt-32 lg:pt-32 xl:px-44 xl:pt-32 2xl:pt-32">
        <h1 className="text-center text-4xl sm:text-6xl">
          About{" "}
          <span className="rounded-md bg-primary/10 px-2 text-primary">
            Digicides
          </span>
        </h1>
        <div className="h-[1px] w-full bg-border" />
        <p className="text-center text-md font-normal text-muted-foreground">
          Digicides Marketing Services Pvt. Ltd. is a SaaS-driven communication
          platform designed exclusively for the agri industry. We help
          agribusinesses connect with farmers, engage them through multi-channel
          communication, and drive sales with data-driven insights. 
        </p>
        <Image
          src="/images/about-us.png"
          alt="About Us"
          width={1000}
          height={1000}
          className="my-10"
        />
      </div>
      <div className="z-10 flex w-full flex-col items-center justify-start gap-8 px-4 pt-20 text-foreground sm:pt-32 md:px-24 md:pt-32 lg:pt-32 xl:px-44 xl:pt-32 2xl:pt-32">
        <h1 className="text-center text-2xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl">
          How{" "}
          <span className="rounded-md bg-primary/10 px-2 text-primary">
            Digicides was born ?
          </span>
        </h1>
        <div className="h-[1px] w-full bg-border" />
        <p className="text-center text-md font-normal text-muted-foreground">
          Agribusiness in India faces challenges in reaching and engaging
          farmers effectively. Digicides was founded in <b>2017</b> to bridge this gap
          with a tech-driven platform that connects businesses, farmers, and
          retailers seamlessly. <br/><br/> Today, we work with <b>52+ enterprises</b>, engaging <b>3 crore farmers</b> and <b>1.2 lakh retailers</b>—transforming agri-marketing with
          data-driven solutions.
        </p>
        {/* <Image src="/images/about-us.png" alt="About Us" width={1000} height={1000} className="my-10"/> */}
      </div>
      <MeetOurTeam />
    </>
  );
}
