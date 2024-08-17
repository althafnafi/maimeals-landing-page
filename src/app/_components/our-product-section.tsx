export function OurProductSection() {
  return (
    <section id="product" className="bg-accent-red py-16">
      <div className="container mx-auto text-center">
        <h2 className="mb-12 text-5xl font-bold text-white">Our Products</h2>
        <div className="flex flex-row justify-center gap-x-8 lg:gap-x-16">
          {" "}
          {/* Added gap-x-8 */}
          {/* Left Item */}
          <div className="flex flex-col items-center">
            <svg
              className="mb-4 h-32 w-32" // Adjust size as needed
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              fill="currentColor"
            >
              {/* Replace with your SVG content */}
              <circle cx="32" cy="32" r="32" fill="#ffffff" />
            </svg>
            <div className="bg-white px-6 py-1 shadow-md">
              <h3 className="text-xl font-bold text-accent-red">
                Katering Sehat
              </h3>
            </div>
            <a href="#" className="mt-2 block text-white underline">
              Learn More
            </a>
          </div>
          {/* Right Item */}
          <div className="flex flex-col items-center">
            <svg
              className="mb-4 h-32 w-32" // Adjust size as needed
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              fill="currentColor"
            >
              {/* Replace with your SVG content */}
              <circle cx="32" cy="32" r="32" fill="#ffffff" />
            </svg>
            <div className="bg-white px-6 py-1 shadow-md">
              <h3 className="text-xl font-bold text-accent-red">
                Konsultasi Gizi
              </h3>
            </div>
            <a href="#" className="mt-2 block text-white underline">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
