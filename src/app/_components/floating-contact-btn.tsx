"use client";

import Image from "next/image";
import Link from "next/link";
import { usePostHog } from "posthog-js/react";
import Cookies from "js-cookie";

export function FloatingContactBtn() {
  const posthog = usePostHog(); // Retrieve the PostHog instance

  const handleClick = () => {
    const sessionId = Cookies.get("sessionId"); // Retrieve sessionId from cookies

    console.log("sessionId", sessionId);
    posthog.capture("whatsapp", { sessionId }); // Send the event with the sessionId
  };

  return (
    <Link
      className="fixed bottom-5 right-5 z-50 flex items-center"
      href={"https://wa.me/6285811524164"}
      onClick={handleClick} // Add the onClick handler here
    >
      <div className="relative">
        <button className="rounded-full border-2 border-white bg-green-700 px-4 text-lg font-bold text-white hover:bg-green-600">
          <div className="pr-8">Klik untuk tanya-tanya</div>
        </button>
        <Image
          src={"logo_wa_trans.svg"}
          alt="WhatsApp Logo"
          width={40} // Set the desired width
          height={40} // Set the desired height
          quality={100}
          className="absolute right-0 top-1/2 -translate-y-1/2 transform" // Positioning the image
        />
      </div>
    </Link>
  );
}
