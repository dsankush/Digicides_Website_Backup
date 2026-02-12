"use client";
import { Button } from "@/components/ui/button";
import PixelBg from "@/components/ui/pixel-bg";
import RightElement from "@/components/ui/right-element";
import RightElementMobile from "@/components/ui/right-element-mobile";
import StatsCard from "@/components/ui/stats-card";
import {
  BadgeDollarSign,
  ChartNoAxesCombined,
  Handshake,
  Wallet,
} from "lucide-react";
import Link from "next/link";

const Hero = () => {
  const handleConnectClick = () => {
    // GTM tracking for hero section contact button clicks
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'button_click',
        button_name: 'connect_with_us_hero',
        button_location: 'hero_section',
        page_location: window.location.href
      });
    }
  };
  return (
    <section className="container relative flex flex-col items-center gap-2 text-center text-foreground ">
      <PixelBg />
      <h1 className="text-4xl font-normal tracking-tighter text-muted-foreground sm:text-5xl md:text-7xl lg:leading-[1.1] z-10">
        Connecting the Dots in Agri Marketing
      </h1>

      <p className="max-w-xl text-balance text-2xl text-primary sm:text-4xl md:text-wrap z-10">
        Discover - Engage - Convert
      </p>

      <div className="block xl:hidden">
        <RightElementMobile />
      </div>
      <div className="flex flex-row">
        <div className="flex w-full flex-col gap-10 py-4 pt-16">
          <div className="mx-auto flex w-full flex-col gap-3">
            <div className="flex w-full flex-col gap-3 sm:flex-row items-center justify-center xl:items-start xl:justify-start">
              <StatsCard
                number="+1.2M"
                text="Leads Discovered"
                lucideIcon={
                  <BadgeDollarSign
                    strokeWidth={1.5}
                    size={28}
                    className="w-16 text-primary/80"
                  />
                }
              />
              <StatsCard
                number="+12"
                text="omni-channels"
                lucideIcon={
                  <Wallet
                    strokeWidth={1.5}
                    size={28}
                    className="w-16 text-primary/80"
                  />
                }
              />
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row items-center justify-center xl:items-start xl:justify-start">
              <StatsCard
                number="+60%"
                text="Leads convert"
                lucideIcon={
                  <Handshake
                    strokeWidth={1.5}
                    size={28}
                    className="w-16 text-primary/80"
                  />
                }
              />
              <StatsCard
                number="+10"
                text="Analysis Method"
                lucideIcon={
                  <ChartNoAxesCombined
                    strokeWidth={1.5}
                    size={28}
                    className="w-16 text-primary/80"
                  />
                }
              />
            </div>
          </div>
          <p className="font-regular max-w-2xl lg:text-left xl:text-left mx-auto lg:mx-0 xl:mx-0 text-xl text-muted-foreground">
            We are empowering agribusinesses with a tech-driven platform for seamless lead generation,
            targeted farmer engagement, and complete marketing transparency.
          </p>
          <Link className="w-[240px] h-[64px] mx-auto lg:mx-0 xl:mx-0" href="#contact-us" onClick={handleConnectClick}>
            <Button variant="secondary" size="lg" className="h-full w-full text-xl">
              Connect with us
            </Button>
          </Link>
        </div>
        <div className="hidden xl:block 2xl:block 3xl:block 4xl:block 5xl:block 6xl:block 7xl:block 8xl:block 9xl:block 10xl:block">
          <RightElement />
        </div>
      </div>
    </section>
  );
};

export default Hero;
