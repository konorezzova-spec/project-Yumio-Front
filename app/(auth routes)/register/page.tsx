"use client";
import { ApiError } from "@/app/api/api";
import { register, type RegisterRequest } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import css from "./RegisterPage.module.css";
import Container from "@/components/Container/Container";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  // Отримуємо метод із стора
  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues: RegisterRequest = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };
      const res = await register(formValues);
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
    <main className={css.mainContent}>
      <Container>
        <form action={handleSubmit} className={css.form}>
          <h2 className={css.formTitle}>Register</h2>
          <p>
            Join our community of culinary enthusiasts, save your favorite
            recipes, and share your cooking creations
          </p>

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
            <label htmlFor="name">Enter your name</label>
            <input
              id="name"
              type="text"
              name="name"
              className={css.input}
              placeholder="Max"
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

          <div className={css.formGroup}>
            <label htmlFor="password">Repeat your password</label>
            <input
              id="password"
              type="password"
              name="password"
              className={css.input}
              required
            />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.submitButton}>
              Create account
            </button>
          </div>

          <p>
            Already have an account?<Link href="/login"> Log in</Link>
          </p>

          {error && <p className={css.error}>{error}</p>}
        </form>
      </Container>
    </main>
  );
}
