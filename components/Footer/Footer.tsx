import Container from "../Container/Container";
import Image from "next/image";
import Link from "next/link";
import css from "./Footer.module.css";

interface FooterProps {
  year: number;
}

export default function Footer({ year }: FooterProps) {
  return (
    <footer className={css.footer}>
      <Container className={css.footer_container}>
        <Link className={css.home_link} href="/" aria-label="Home">
          <Image
            className={css.logo}
            src="/logo.svg"
            alt="logo"
            width={32}
            height={30}
            priority
          />
          Yumio
        </Link>
        <p className={css.text}>
          © {year} CookingCompanion. All rights reserved.
        </p>
        <nav aria-label="Main Navigation">
          <ul className={css.navigation}>
            <li>
              <Link href="/recipes/filter/all">Recipes</Link>
            </li>
            <li>
              <Link href="/account">Account</Link>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
