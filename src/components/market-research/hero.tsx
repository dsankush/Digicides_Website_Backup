import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import PixelBg from "../ui/pixel-bg";

export default function MarketResearchHero() {
  return (
    <section className="container relative flex flex-col items-center pt-8 gap-2 text-center text-foreground">
      <PixelBg />
      {/* <div className="absolute bottom-0 left-0 right-0 w-full z-[-10] h-12 bg-gradient-to-b from-[#fbf1e8] to-white" /> */}
      {/* <div className="absolute top-0 left-0 right-0 w-full z-[-10] h-12 bg-gradient-to-t from-[#fdf5ed] to-white" /> */}
      <h1 className="z-10 text-2xl font-normal tracking-tighter text-muted-foreground sm:text-4xl lg:leading-[1.1]">
        Market Research for Agri Brands
      </h1>
      <h2 className="text-lg md:text-6xl max-w-3xl mt-4 font-normal tracking-tighter text-primary">
        Know Your Audience - <span className="text-primary">
          Act with Precision
        </span>
      </h2>
      <div className="block xl:hidden">
        <div className="ml-4">
          <Image src="/market-research/market-research-hero.png" alt="Right Element" width={600} height={600} />
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex w-full flex-col gap-10 py-4 pt-16">
          <div className="xl:text-left xl:block hidden 2xl:text-left 3xl:text-left 4xl:text-left 5xl:text-left 6xl:text-left 7xl:text-left 8xl:text-left 9xl:text-left 10xl:text-left text-center pt-28">
            <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tighter text-orange-500">
            </h2>
          </div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl  font-regular mx-10 max-w-2xl text-muted-foreground lg:mx-0 lg:text-left xl:mx-0 xl:text-left">
            Collect valuable insights directly from the field—while running
            digital campaigns that promote your brand and engage real farmers.
            At Digicides, we blend market research with campaign execution to
            help agri brands grow smarter.
          </p>
          <Link
            className="mx-auto h-[64px] w-[380px] sm:min-w-[440px] md:min-w-[440px] lg:min-w-[440px] xl:min-w-[440px] lg:mx-0 xl:mx-0"
            href="#contact-us"
          >
            <Button
              variant="secondary"
              size="lg"
              className="h-full w-fit text-md sm:text-xl"
            >
              Start a Research-Driven Campaign
            </Button>
          </Link>
        </div>
        <div className="hidden xl:block 2xl:block 3xl:block 4xl:block 5xl:block 6xl:block 7xl:block 8xl:block 9xl:block 10xl:block">
          <div className="right-0 -mr-20 mt-20">
            <Image
              src="/market-research/market-research-hero.png"
              alt="Right Element"
              // layout="responsive"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
