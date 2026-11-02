"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, type LoginRequest } from "@/lib/api/clientApi";
import css from "./LoginPage.module.css";
import { ApiError } from "@/app/api/api";
import { useAuthStore } from "@/lib/store/authStore";
import Container from "@/components/Container/Container";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState("");
  // Отримуємо метод із стора
  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues: LoginRequest = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };
      const res = await login(formValues);
      if (res) {
        // Записуємо користувача у глобальний стан
        setUser(res);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Oops... some error"
      );
    }
  };

  return (
    <main>
      <Container className={css.main_content}>
        <form action={handleSubmit} className={css.form}>
          <h2 className={css.formTitle}>Login</h2>

          <div className={css.formGroup}>
            <label htmlFor="email">Enter your email address</label>
            <input
              id="email"
              type="email"
              name="email"
              className={css.input}
              placeholder="email@gmail.com"
              required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Create a strong password</label>
            <input
              id="password"
              type="password"
              name="password"
              className={css.input}
              required
            />
          </div>

          <button type="submit" className={css.submitButton}>
            Login
          </button>

          <p>
            Dont have an account?{" "}
            <Link href="/register" aria-label="register">
              Register
            </Link>
          </p>

          {error && <p className={css.error}>{error}</p>}
        </form>
      </Container>
    </main>
  );
}
