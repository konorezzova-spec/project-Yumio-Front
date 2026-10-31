"use client";

import css from "./AuthNavigation.module.css";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";
import Image from "next/image";
import logoutIcon from "/public/logout.svg";
import Link from "next/link";

interface AuthNavigationProps {
  onClick: () => void;
}

export default function AuthNavigation({ onClick }: AuthNavigationProps) {
  const router = useRouter();
  // Отримуємо поточну сесію та юзера
  const { isAuthenticated, user } = useAuthStore();
  // Отримуємо метод очищення глобального стану
  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated
  );

  const handleLogout = async () => {
    // Викликаємо logout
    await logout();
    // Чистимо глобальний стан
    clearIsAuthenticated();
    // Виконуємо навігацію на сторінку авторизації
    onClick();
    router.push("/login");
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <li className={css.navItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navLink}
              onClick={onClick}
            >
              My Profile
            </Link>
          </li>
          <li>
            <Link
              className={`${css.btn} ${css.laptopBtn}`}
              href="/profile/recipes/create"
              prefetch={false}
              onClick={onClick}
            >
              add Recipe
            </Link>
          </li>
          <li className={css.privatInfo}>
            <div className={css.avatar}>
              {user?.avatar ? (
                <Image
                  className={css.avatarImg}
                  src={user?.avatar}
                  alt="user avatar"
                  fill
                />
              ) : (
                <p>{user?.name.slice(0, 1).toUpperCase()}</p>
              )}
            </div>
            <p className={css.userName}>{user?.name}</p>
            <div className={css.strip}></div>
            <button type="button" onClick={handleLogout} className={css.logout}>
              <Image alt="login out" src={logoutIcon} width={24} height={24} />
            </button>
          </li>
          <li>
            <Link
              className={`${css.btn} ${css.mobBtn}`}
              href="/profile/recipes/create"
              prefetch={false}
              onClick={onClick}
            >
              Add Recipe
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link
              className={css.navLink}
              href="/login"
              prefetch={false}
              onClick={onClick}
            >
              Log in
            </Link>
          </li>
          <li>
            <Link
              className={css.btn}
              href="/register"
              prefetch={false}
              onClick={onClick}
            >
              Register
            </Link>
          </li>
        </>
      )}
    </>
  );
}
