import Link from "next/link";
import Image from "next/image";

export function ChatNavigationBar() {
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
            { href: "https://maimeals.id/#home", text: "HOME" },
            { href: "https://maimeals.id/#about", text: "ABOUT" },
            {
              href: "https://maimeals.id/#product",
              text: "PRODUCT",
            },
            {
              href: "https://maimeals.id/#contact",
              text: "CONTACT US",
            },
            { href: "http://168.231.119.233:7900/", text: "CHAT" },
          ].map((link, index) => (
            <Link
              key={link.text}
              href={link.href}
              className={`group relative flex h-full items-center px-8 text-accent-red hover:text-gray-600 lg:px-10 ${index < 4 ? "border-r-2 border-accent-red" : ""} `}
            >
              {link.text}
              <span className="absolute bottom-0 left-0 h-1 w-full scale-x-0 transform bg-accent-red transition-transform duration-200 group-hover:scale-x-100"></span>
            </Link>
          ))}
        </div>
      </div>

      {/* Order Now button on the right */}
      <div className="flex items-center bg-accent-red px-8 text-xl font-bold text-white hover:bg-red-700">
        <Link href="https://wa.me/6285141739229">ORDER NOW!</Link>
      </div>
    </nav>
  );
}
