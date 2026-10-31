import Link from "next/link";
import css from "./Profile.module.css";
import Image from "next/image";
import { getMe } from "@/lib/api/serverApi";
import { Metadata } from "next";

const SITE_URL = process.env.SITE_URL;
if (!SITE_URL) {
  throw new Error("SITE_URL is not defined in the environment variables");
}

export const metadata: Metadata = {
  title: "Recipes user profile",
  description: "User profile page",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Yumio",
    description: "Profile page",
    url: SITE_URL,
    images: [
      {
        url: "/",
        alt: "Recipe app",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function ProfilePage() {
  const user = await getMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={
              user?.avatar ||
              "https://res.cloudinary.com/rvojizer/image/upload/v1793091224/default-avatar.jpg"
            }
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
