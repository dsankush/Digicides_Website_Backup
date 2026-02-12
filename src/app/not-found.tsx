import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";

const PageNotFound = () => {
  return (
    <>
      <Navbar />
      <main className="flex h-screen items-center justify-center bg-white text-center">
      <div className="p-8 ">
        <h1 className="text-4xl font-bold text-primary mb-4">Under Construction</h1>
        <p className="text-lg text-gray-600 mb-6">
          We&apos;re working hard to bring you something amazing. Please check back later!
        </p>
        <div className="flex justify-center">
        </div>
      </div>
    </main>
      <Footer />
    </>
  );
};

export default PageNotFound;
