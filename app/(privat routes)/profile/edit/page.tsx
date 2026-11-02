// app/(private routes)/profile/edit/page.tsx

"use client";

import { useEffect, useState } from "react";
import AvatarPicker from "@/components/AvatarPicker/AvatarPicker";
import { getMe, updateMe, uploadImage } from "@/lib/api/clientApi";
import css from "./EditProfile.module.css";

const EditProfile = () => {
  const [userName, setUserName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    getMe().then(user => {
      setUserName(user.name ?? "");
      setAvatarUrl(user.avatar ?? "");
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newPhotoUrl = file ? await uploadImage(file) : "";
      await updateMe({ name: userName, avatar: newPhotoUrl });
    } catch (error) {
      console.error("Oops, some error:", error);
    }
  };

  return (
    <div className={css.container}>
      <h1>Edit profile</h1>
      <AvatarPicker profilePhotoUrl={avatarUrl} onChangePhoto={setFile} />

      <form onSubmit={handleSaveUser}>
        <input type="text" value={userName} onChange={handleChange} />

        <button className={css.button} type="submit">
          Save user
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
