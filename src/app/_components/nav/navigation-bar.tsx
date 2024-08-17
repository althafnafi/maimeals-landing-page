import Link from "next/link";
import Image from "next/image";

export function NavigationBar() {
  return (
    <nav className="fixed top-0 z-50 flex h-14 w-full items-stretch justify-between bg-white shadow-md">
      {/* Logo on the left */}
      <Link href="/" className="flex items-center pl-3 md:pl-8">
        <Image
          src={"/logo_maimeals_trans.svg"}
          alt="mAIMeals Logo"
          width={65}
          height={65}
          priority
        />
      </Link>

      {/* Navigation links for larger screens */}
      <div className="hidden items-center tracking-widest md:flex">
        <div className="flex h-full items-center pt-2 font-semibold">
          {[
            { href: "/#home", text: "HOME" },
            { href: "/#about", text: "ABOUT" },
            { href: "/#product", text: "PRODUCT" },
            { href: "/#contact", text: "CONTACT US" },
          ].map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative flex h-full items-center px-8 text-accent-red hover:text-gray-600 lg:px-10 ${index < 3 ? "border-r-2 border-accent-red" : ""} `}
            >
              {link.text}
              <span className="absolute bottom-0 left-0 h-1 w-full scale-x-0 transform bg-accent-red transition-transform duration-200 group-hover:scale-x-100"></span>
            </Link>
          ))}
        </div>
      </div>

      {/* Order Now button on the right */}
      <div className="flex items-center bg-accent-red px-8 text-xl font-bold text-white hover:bg-red-700">
        <Link href="/#">ORDER NOW!</Link>
      </div>
    </nav>
  );
}
