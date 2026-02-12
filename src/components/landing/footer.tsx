"use client";
import Link from "next/link";
import { Shell } from "../shell";
import { Button } from "../ui/button";
import FooterPixel from "../ui/footer-pixel";
const Footer = () => {
  const FOOTER_LINKS = [
    {
      title: "Quick links",
      links: [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Product", href: "/product" },
      ],
    },
    {
      title: "Social",
      links: [
        { name: "LinkedIn", href: "https://www.linkedin.com/company/digicides/" },
        { name: "Facebook", href: "https://www.facebook.com/digicides.in/" },
        { name: "Instagram", href: "https://www.instagram.com/digicides/" },
      ],
    },
  ];
  
  const handleDemoRequestClick = () => {
    // GTM tracking for demo request button clicks
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'button_click',
        button_name: 'demo_request_footer',
        button_location: 'footer',
        page_location: window.location.href
      });
    }
  };

  const handleGetInTouchClick = () => {
    // GTM tracking for get in touch button clicks
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'button_click',
        button_name: 'get_in_touch_footer',
        button_location: 'footer',
        page_location: window.location.href
      });
    }
  };

  return (
    <footer className="relative w-full pt-20 mt-20 overflow-hidden border-t bg-[#f7f7f7]">
      <FooterPixel />
      <Shell>
        <div className="footer relative flex w-full flex-col justify-between overflow-hidden md:flex-row">
          {/* logo */}
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-2 text-xl sm:text-3xl lg:text-4xl xl:text-4xl">
              Discover - Engage -{" "}
              <span className="bg-primary/10 px-2 rounded-md text-primary">
                Convert
              </span>
            </div>
            <p className="mt-4 max-w-lg text-left text-sm sm:text-base md:text-base lg:text-base text-muted-foreground">
            We are empowering agribusinesses with a tech-driven platform for seamless lead generation,
            targeted farmer engagement, and complete marketing transparency.
            </p>
            <div className="flex flex-row sm:flex-row gap-10">
            <Link className="mt-10" href="/" onClick={handleDemoRequestClick}>
                <Button>Demo request</Button>
              </Link>
              <Link className="mt-10" href="#contact-us" onClick={handleGetInTouchClick}>
                <Button variant="secondary" >
                  Get in touch ↗
                </Button>
              </Link>
            </div>
          </div>
          {/* links */}
          <div className="mt-20 grid max-w-sm grid-cols-2 gap-12 md:mt-0 lg:grid-cols-2">
            {FOOTER_LINKS?.map((section, index) => (
              <div key={index} className="flex flex-col gap-4">
                <h3 className="text-nowrap text-xl font-medium">
                  {section.title}
                </h3>
                <ul className="min-w-[100px] space-y-4">
                  {section.links.map((link, index) => (
                    <li
                      key={index}
                      className="text-md text-muted-foreground transition-all hover:text-foreground"
                    >
                      <Link href={link.href} className="w-full text-nowrap">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <hr className="w-full" />
        <div className="relative flex items-center justify-between">
          <p className="text-sm font-[400] text-muted-foreground">
            Digicides © {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-4">
            <Link
              target="_blank"
              rel="noreferrer"
              href="/privacy-policy"
              className="p-1 text-sm text-muted-foreground transition-all hover:text-foreground mr-10"
            >
              Privacy Policy 
            </Link>
          </div>
        </div>
      </Shell>
    </footer>
  );
};

export default Footer;
