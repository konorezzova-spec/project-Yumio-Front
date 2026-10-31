"use client";

import Link from "next/link";
import css from "./Header.module.css";
import Image from "next/image";
import Container from "../Container/Container";
import logo from "/public/logo.svg";
import burger_menu from "/public/burger_menu.svg";
import close from "/public/close_btn.svg";
import { useState, useEffect, useRef } from "react";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const prevScrollY = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 80) {
        setIsVisible(true);
      } else if (currentScrollY > prevScrollY.current + 5) {
        setIsVisible(false);
      } else if (currentScrollY < prevScrollY.current - 5) {
        setIsVisible(true);
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <header className={`${css.header} ${isVisible ? css.visible : css.hidden}`}>
      <Container className={css.header_container}>
        <Link
          className={css.home_link}
          href="/"
          aria-label="Home"
          onClick={closeMenu}
        >
          <Image
            className={css.logo}
            src={logo}
            alt="logo"
            width={32}
            height={30}
            priority
          />
          Yumio
        </Link>
        <button
          type="button"
          className={css.burger}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? (
            <Image
              className={css.logo}
              src={close}
              alt="close"
              width={32}
              height={32}
            />
          ) : (
            <Image
              className={css.logo}
              src={burger_menu}
              alt="logo"
              width={17}
              height={12}
            />
          )}
        </button>
        <nav className={css.desktopMenu}>
          <ul className={css.nav}>
            <li className={css.navItem}>
              <Link
                href="/recipes/filter/all"
                prefetch={false}
                className={css.navLink}
              >
                Recipes
              </Link>
            </li>
            <AuthNavigation onClick={closeMenu} />
          </ul>
        </nav>
      </Container>

      {isMenuOpen && (
        <nav className={css.mobileMenu} aria-hidden={!isMenuOpen}>
          <ul className={css.nav}>
            <li className={css.navItem}>
              <Link
                href="/recipes/filter/all"
                prefetch={false}
                className={css.navLink}
                onClick={closeMenu}
              >
                Recipes
              </Link>
            </li>
            <AuthNavigation onClick={closeMenu} />
          </ul>
        </nav>
      )}
    </header>
  );
}
