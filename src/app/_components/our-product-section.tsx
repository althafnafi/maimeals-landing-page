import { ConsultationSvg } from "@/components/svg/svg-consultation";
import { CateringSvg } from "@/components/svg/svg-catering";

export function OurProductSection() {
  return (
    <section id="product" className="bg-accent-red py-16">
      <div className="container mx-auto text-center">
        <h2 className="mb-4 text-5xl font-bold text-white">Our Products</h2>

        {/* Subtext Introduction */}
        <div className="flex justify-center pb-12 text-center text-xl text-white">
          <div className="s:w-[90vw] lg:w-[70vw]">
            Kami berdedikasi untuk menyediakan solusi diet yang disesuaikan
            dengan kebutuhan kesehatan unik Anda. Eskplor penawaran kami di
            bawah ini untuk menemukan yang paling sesuai dengan kebutuhan Anda!
          </div>
        </div>

        <div className="flex flex-row flex-wrap justify-center gap-x-8 lg:gap-x-16">
          {/* Left Item */}
          <div className="flex flex-col items-center py-12 md:py-0">
            <CateringSvg width={150} height={150} color="white" />
            {/* Adjust size as needed */}
            <div className="mt-5 bg-white px-6 py-1 shadow-md">
              <h3 className="text-xl font-bold text-accent-red">
                Katering Sehat
              </h3>
            </div>
            <a href="#" className="mt-2 block text-lg text-white underline">
              Learn More
            </a>
          </div>
          {/* Right Item */}
          <div className="flex flex-col items-center py-12 md:py-0">
            <ConsultationSvg width={150} height={150} color="white" />
            {/* Adjust size as needed */}
            <div className="mt-5 bg-white px-6 py-1 shadow-md">
              <h3 className="text-xl font-bold text-accent-red">
                Konsultasi Gizi
              </h3>
            </div>
            <a href="#" className="mt-2 block text-lg text-white underline">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
