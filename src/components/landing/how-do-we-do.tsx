import Image from "next/image";
import Link from "next/link";

const HowDoWeDo = () => {
  return (
    <div className="z-10 flex  w-full flex-col items-center justify-start gap-8 px-4 pt-20 sm:pt-32 md:pt-32 lg:pt-32 xl:pt-32 2xl:pt-32 text-foreground md:px-24 xl:px-44">
      <div className="flex flex-wrap-reverse">
        <div className="h-full w-full md:w-1/2 my-auto ">
          <Image
            src="/how-do-we-do.webp"
            alt="What do we do"
            width={1000}
            height={1400}
            className="h-[400px] pt-5 md:pt-0 object-contain"
          />
        </div>
        <div className="flex w-full flex-col md:items-start md:justify-start lg:items-start lg:justify-start xl:items-start xl:justify-start gap-4 md:w-1/2">
          <h2 className="text-center text-3xl md:text-4xl">
            How do we{" "}
            <span className="rounded-md bg-primary/10 px-2 text-primary">
              do?
            </span>
          </h2>
          <div className="h-[1px] w-full bg-border" />
          <p className="text-left text-md font-normal text-muted-foreground">
          Our platform harnesses cutting-edge technology to streamline agricultural data and
          communication.
          </p>
          <p className="text-left text-md font-normal text-muted-foreground">
            It integrates inputs from missed calls, app data, and social media
            into a core system that manages farmer and retailer activities.
          </p>
          <p className="text-left text-md font-normal text-muted-foreground">
            With Kafka pipelines ensuring real-time data flow and APIs powering
            SMS, IVR, and WhatsApp integrations, we deliver seamless
            connectivity.
          </p>
          <p className="text-left text-md font-normal text-muted-foreground">
            The frontend, crafted with PHP, Angular, HTML, and CSS, pairs with
            tools like Superset, LogStash, or OLAP for insightful dashboards.
          </p>
          <p className="text-left text-md font-normal text-muted-foreground">
          Data lakes fuel advanced reporting, driving smarter data-driven decisions for your agri-business.
          </p>
          <Link href="/under-construction" className="text-center bg-white text-orange-500 text-xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl hover:bg-white">
            Know more ↗
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowDoWeDo;
