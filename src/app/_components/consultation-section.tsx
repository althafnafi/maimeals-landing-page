import Image from "next/image";
import Link from "next/link";

export function ConsultationSection() {
  return (
    <section className="bg-white px-2 py-12">
      <div className="container mx-auto">
        <div className="flex flex-row flex-wrap justify-center gap-2 lg:gap-8">
          {/* Left Column: Image */}
          <div className="flex justify-center">
            <Image
              src="/illust_phone_contact.png"
              alt="Consultation Illustration"
              width={225} // Adjust width as needed
              height={225} // Adjust height as needed
              className="object-contain"
            />
          </div>

          {/* Right Column: Text */}
          <div className="flex w-[50vh] flex-col items-center justify-center">
            {/* Top Text */}
            <h2 className="mb-6 pt-4 text-center text-3xl font-bold leading-none text-black">
              Masih bingung terkait kebutuhan gizimu? atau mau tanya-tanya menu?
            </h2>

            {/* Second Row: Two Columns */}
            <div className="flex flex-row items-center justify-center gap-3">
              {/* Left Column: Black Text */}
              <div className="text-right text-2xl text-black lg:text-3xl">
                <p>
                  <em>
                    Konsultasi dengan <br />
                    ahlinya sekarang!
                  </em>
                </p>
              </div>
              {/* Right Column: Image */}
              <div className="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="green"
                  className="size-20"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                  />
                </svg>
              </div>
            </div>

            {/* Third Row: Red Text */}
            <div className="flex w-fit flex-col gap-2">
              <Link href={"google.com"}>
                <div className="text-bold mt-10 h-fit bg-yellow-400 px-2 py-1 text-center text-2xl font-bold text-accent-red hover:bg-yellow-300">
                  KONSULTASIKAN SEKARANG
                </div>
              </Link>
              <Link href={"google.com"}>
                <div className="h-fit bg-accent-red px-2 py-1 text-center text-2xl font-bold text-yellow-400 hover:bg-red-800">
                  PESAN SEKARANG
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
