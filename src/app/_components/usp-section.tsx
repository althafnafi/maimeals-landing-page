import Image from "next/image";

export function UspSection() {
  const cards = [
    {
      title: "Dibuat dari Bahan Makanan Segar",
      description:
        "Menu makanan sehat yang lezat dan mengenyangkan, serta menggunakan bahan makanan yang segar dan terjamin kebersihannya.",
      image: "/bg_about_1.png",
    },
    {
      title: "Menu yang Dipersonalisasi",
      description:
        "Menu makanan yang dipersonalisasi sesuai dengan kebutuhan tubuhmu.",
      image: "/bg_about_2.png",
    },
    {
      title: "Dilengkapi dengan Ahli Gizi",
      description:
        "Kamu dapat melakukan konsultasi gizi untuk mendapatkan rekomendasi menu yang sesuai dengan kebutuhan gizimu.",
      image: "/bg_about_3.png",
    },
  ];

  return (
    <section id="about" className="relative bg-white px-2 pb-32 pt-20 lg:px-8">
      <div className="container mx-auto text-center">
        <h2 className="pb-4 pt-12 text-5xl font-bold text-accent-red">
          Kenapa mAIMeals?
        </h2>
        <p className="text-lg text-gray-700">
          Setiap hidangan kami dirancang dengan cermat untuk{" "}
          <span className="bg-accent-red px-2 py-1 text-white">
            memenuhi kebutuhan gizi Anda
          </span>
          , memastikan Anda mendapatkan makanan yang tidak hanya enak tetapi
          juga bermanfaat bagi kesehatan Anda. Temukan keunggulan kami di bawah
          ini!
        </p>
        <div className="grid grid-cols-1 gap-8 pt-10 md:grid-cols-3">
          {cards.map((card, index) => (
            <div
              key={index}
              className="relative h-64 w-full overflow-hidden rounded-lg shadow-lg md:h-96 lg:h-64"
            >
              <Image
                src={card.image}
                alt={card.title}
                layout="fill" // Use layout fill for square cards
                objectFit="cover" // Ensure the image covers the card
                className="absolute inset-0"
              />
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
                <h3 className="px-2 text-3xl font-bold">{card.title}</h3>
                <p className="text-md">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="custom-shape-divider-top-1723845175">
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
