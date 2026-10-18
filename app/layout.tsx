import type { Metadata } from "next";
import "./globals.css";
import { montserrat, dm } from "@/app/fonts";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
// import TanstackProvider from "@/components/TanstackProvider/TanstackProvider";

const SITE_URL = process.env.SITE_URL;
if (!SITE_URL) {
  throw new Error("SITE_URL is not defined in the environment variables");
}

export const metadata: Metadata = {
  title: "Recipes App",
  description:
    "App with a collection of delicious recipes, grouped by categories",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Recipes App",
    description:
      "App with a collection of delicious recipes, grouped by categories",
    url: SITE_URL,
    images: [
      {
        url: "/public",
        alt: "product image",
        width: 600,
        height: 300,
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} ${dm.variable}`}>
      <body>
        {/* <TanstackProvider> */}
        <Header />
        <main>{children}</main>
        <Footer />
        {/* </TanstackProvider> */}
      </body>
    </html>
  );
}
