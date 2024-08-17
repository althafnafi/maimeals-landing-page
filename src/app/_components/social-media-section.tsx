import Image from "next/image";

export function SocialMediaSection() {
  return (
    <section id="contact" className="relative bg-gray-800 py-20">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/template.webp"
          alt="Hero Background"
          fill
          priority // Load this image with high priority
          className="object-cover" // Ensures the image covers the section without distortion
        />
      </div>

      {/* White overlay with fade effect */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-white to-white/30"
        style={{ zIndex: 1 }} // Ensure the overlay is above the content
      />

      <div className="container relative z-10 mx-auto px-4 py-16">
        {" "}
        {/* Add z-10 to content */}
        {/* Centered Red Bold Text */}
        <h2 className="mb-8 text-center text-5xl font-bold text-accent-red drop-shadow-sm">
          KEEP IN TOUCH WITH US!
        </h2>
        {/* Flex Row for Social Media Icons */}
        <div className="flex flex-wrap items-center justify-center gap-12 space-x-4">
          {/* First Element: Flex Col with Logo and Text */}
          <div className="flex flex-col items-center">
            <Image
              src="/logo_maimeals_trans.svg"
              alt="mAIMeals Logo"
              width={200} // Adjust width as needed
              height={200} // Adjust height as needed
            />
            <p className="text-center font-light leading-tight text-black">
              Your Personalized Path <br />
              to Healthier Eating
            </p>
          </div>

          {/* Second Element: Flex Col with Bold Text and Flex Row */}
          <div className="flex flex-col">
            <h3 className="mb-2 text-3xl font-bold text-black">social media</h3>
            <div className="flex flex-wrap justify-center space-x-2">
              {/* Three Elements: mAIMeals Logo SVG */}
              <Image
                src="logo_ig_trans.svg"
                alt="Instagram Logo"
                width={40} // Adjust width as needed
                height={40} // Adjust height as needed
              />
              <Image
                src="/logo_x_trans.svg"
                alt="Twitter/X Logo"
                width={40} // Adjust width as needed
                height={40} // Adjust height as needed
              />
              <Image
                src="logo_wa_black_trans.svg"
                alt="WhatsApp Logo"
                width={40} // Adjust width as needed
                height={40} // Adjust height as needed
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
