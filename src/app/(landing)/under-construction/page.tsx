import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const UnderConstructionPage = () => {
  return (
    <main className="flex h-screen items-center justify-center bg-white text-center">
      <div className="p-8 ">
        <h1 className="text-4xl font-bold text-primary mb-4">Under Construction</h1>
        <p className="text-lg text-gray-600 mb-6">
          We&apos;re working hard to bring you something amazing. Please check back later!
        </p>
        <div className="flex justify-center">
          {/* <img src="/images/under-construction.png" alt="Under Construction" className="w-1/2" /> */}
        </div>
      </div>
    </main>
  );
};

export default UnderConstructionPage;
