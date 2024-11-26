import Link from "next/link";
import Image from "next/image";

export function NavigationBar() {
  const navLinks = [
    { href: "/#home", text: "HOME" },
    { href: "/#about", text: "ABOUT" },
    { href: "/#product", text: "PRODUCT" },
    { href: "/#contact", text: "CONTACT US" },
    { href: "/chat", text: "CHAT" },
  ];

  return (
    <nav className="fixed top-0 z-50 flex h-16 w-full items-center justify-between bg-white shadow-md">
      {/* Mobile Chat Link */}
      <div className="flex items-center bg-accent-red px-4 py-3 text-sm font-bold text-white hover:bg-red-700 md:hidden">
        {/* <Link href="http://145.223.117.210:7900/">CHAT WITH BOT</Link> */}
        <Link href="/chat"> CHAT WITH BOT </Link>
      </div>

      {/* Logo */}
      <div className="absolute left-1/2 flex h-full -translate-x-1/2 items-center md:relative md:left-0 md:translate-x-0 md:pl-8">
        <Link href="/">
          <Image
            src={"/logo_maimeals_trans.svg"}
            alt="mAIMeals Logo"
            width={65}
            height={65}
            priority
          />
        </Link>
      </div>

      {/* Navigation links */}
      <div className="hidden h-full items-center tracking-widest md:flex">
        <div className="flex h-full items-center font-semibold">
          {navLinks.map((link, index) => (
            <Link
              key={link.text}
              href={link.href}
              className={`group relative flex h-full items-center px-8 text-accent-red hover:text-gray-600 lg:px-10 ${
                index < 4 ? "border-r-2 border-accent-red" : ""
              }`}
            >
              {link.text}
              <span className="absolute bottom-0 left-0 h-1 w-full scale-x-0 transform bg-accent-red transition-transform duration-200 group-hover:scale-x-100"></span>
            </Link>
          ))}
        </div>
      </div>

      {/* Order Now button */}
      <div className="flex items-center bg-accent-red px-4 py-3 text-sm font-bold text-white hover:bg-red-700 md:px-8 md:text-xl">
        <Link href="/#">ORDER NOW!</Link>
      </div>
    </nav>
  );
}
