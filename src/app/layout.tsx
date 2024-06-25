"use client";
import "./globals.css";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import ProvidersReduxAndAnt from "@/lib/Providers";
import GlobalContextApi from "@/components/ContextApi/GlobalContextApi";
import { Open_Sans } from "next/font/google";
import { SocketProvider } from "@/components/ContextApi/SocketContextApi";

const inter = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "300"],
  style: ["normal"],
});

// import '../app/globals.css';
// export const metadata: Metadata = {
//   title: "Education Services",
//   description: "Generated by create next app",
// };
{
  /* <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta> */
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProvidersReduxAndAnt>
      <GlobalContextApi>
        <SocketProvider>
          <html lang="en" className={inter.className}>
            <meta
              httpEquiv="Content-Security-Policy"
              content="upgrade-insecure-requests"
            />

            <body
              // className="container mx-auto "
              className={` max-w-[1990px] mx-auto `}
              // style={{maxWidth: '1990px',margin:"auto"}}
            >
              {children}
            </body>
          </html>
        </SocketProvider>
      </GlobalContextApi>
    </ProvidersReduxAndAnt>
  );
}
