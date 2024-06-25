import Link from "next/link";
import React from "react";
import logoFullImage from "@/assets/Logo/logoFull.png"
import logoImage from "@/assets/Logo/logOnly.png"
import Image from "next/image";

const Logo = () => {
  return (
    <Link
      href="/"
      style={{
        textDecoration: "none",
        fontWeight: "700",
        color: "black",
        fontSize: "1.3rem",
        fontFamily: "sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // background:"white",
        // paddingBlock:"0.2rem",
        // borderRadius:"5px"
        background: "transparent"
      }}
    >
      <Image src={'/logo.png'} height={300} width={300} className="w-[5.125rem] h-20 rounded-2xl p-2
       " alt="Logo" />


    </Link>
  );
};

export default Logo;
