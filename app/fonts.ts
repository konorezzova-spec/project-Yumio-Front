import localFont from "next/font/local";

export const montserrat = localFont({
  src: [
    {
      path: "../fonts/montserrat-v31-latin/montserrat-v31-latin-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/montserrat-v31-latin/montserrat-v31-latin-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/montserrat-v31-latin/montserrat-v31-latin-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

export const dm = localFont({
  src: [
    {
      path: "../fonts/dm-sans-v17-latin/dm-sans-v17-latin-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/dm-sans-v17-latin/dm-sans-v17-latin-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-dm",
  display: "swap",
});
