// Ensure the correct path to your images
import { AllImage } from "@/assets/AllImge";
import Image from "next/image";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen gap-20">
      <div className="flex flex-col justify-center items-center gap-6">
        <Image
          src={AllImage.logo}
          width={146}
          height={150}
          alt="Picture of the author"
        />
        <Image
          src={AllImage.authLogo}
          width={251}
          height={225}
          alt="Picture of the author"
        />
      </div>
      <div className="w-[20%]">{children}</div>
    </div>
  );
}
