import Image from "next/image";
import Link from "next/link";

export function FloatingContactBtn() {
  return (
    <Link
      className="fixed bottom-4 right-4 z-50 flex items-center"
      href="/#contact"
    >
      <div className="relative">
        <button className="rounded-full border-2 border-white bg-green-700 px-4 text-lg font-bold text-white hover:bg-green-600">
          <div className="pr-10">Klik untuk tanya-tanya</div>
        </button>
        <Image
          src="/logo_wa_trans.png"
          alt="WhatsApp Logo"
          width={50} // Set the desired width
          height={50} // Set the desired height
          className="absolute right-0 top-1/2 -translate-y-1/2 transform" // Positioning the image
        />
      </div>
    </Link>
  );
}
