import Image from "next/image";

export function MainHero() {
  return (
    <section
      id="home"
      className="relative flex h-[97vh] flex-col items-start justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src="/template.webp"
          alt="Hero Background"
          fill
          priority // Load this image with high priority
          className="object-cover" // Ensures the image covers the section without distortion
        />
      </div>
      <div className="relative z-10 h-full w-full bg-black bg-opacity-50 p-14 pt-56">
        <h1 className="mb-4 text-6xl font-bold text-white lg:text-7xl">
          Delicious & <br /> Nutritious Catering <br /> for a Healthier You!
        </h1>
        <p className="mb-6 max-w-[70vh] text-xl text-white">
          Kami percaya, setiap gigitan yang bergizi adalah investasi kesehatan
          dan kebahagiaanmu.
        </p>
        <button className="rounded-[30px] bg-white px-6 py-2 text-3xl font-bold text-accent-red transition duration-300 hover:bg-red-600 hover:text-white">
          Pesan Sekarang
        </button>
      </div>
      <div className="custom-shape-divider-bottom-1723843172 z-40">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </section>
  );
}
