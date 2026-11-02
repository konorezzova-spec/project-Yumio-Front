import type { Metadata } from "next";
import "./globals.css";
import { montserrat, dm } from "@/app/fonts";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import css from "./layout.module.css";
import { cacheLife } from "next/cache";
import TanStackProvider from "@/components/TanstackProvider/TanstackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

async function getCurrentYear() {
  "use cache";
  cacheLife("max");
  return new Date().getFullYear();
}

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
        url: "https://res.cloudinary.com/rvojizer/image/upload/v1793620526/main_picture.jpg.png",
        alt: "Recipe image",
        width: 600,
        height: 300,
      },
    ],
  },
};

type Props = LayoutProps<"/"> & {
  modal: React.ReactNode;
};

export default async function RootLayout({ children, modal }: Props) {
  return (
    <html lang="uk" className={`${montserrat.variable} ${dm.variable}`}>
      <body className={css.body}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main className={css.main}>{children}</main>
            {modal}
            <Footer year={await getCurrentYear()} />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
