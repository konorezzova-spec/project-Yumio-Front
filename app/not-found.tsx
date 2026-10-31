"use client";

import Container from "@/components/Container/Container";
import Image from "next/image";
import Link from "next/link";
import css from "./not-found.module.css";
import lefterrow from "/public/left_arrow.svg";
import notFoundImg from "/public/not_found_img.png";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Редірект через 3 секунди
    const timer = setTimeout(() => router.push("/"), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Container className={css.not_found}>
      <div className={css.img_box}>
        <Image
          className={css.img}
          src={notFoundImg}
          alt="Image of empty plate"
          width={600}
          height={438}
          priority
          placeholder="blur"
        />
      </div>

      <div>
        <h1>404 Page not found</h1>
        <p>You will be redirected to the home page in a few seconds…</p>
      </div>

      <Link href="/">
        <Image
          className={css.svg}
          src={lefterrow}
          alt="Go back"
          width="10"
          height="9"
        />
        Back to Home
      </Link>
    </Container>
  );
}
