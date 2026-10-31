// components/AvatarPicker/AvatarPicker.tsx

"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import css from "./AvatarPicker.module.css";

type Props = {
  onChangePhoto: (file: File | null) => void;
  profilePhotoUrl?: string;
};

const AvatarPicker = ({ profilePhotoUrl, onChangePhoto }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  if (profilePhotoUrl) {
    setPreviewUrl(profilePhotoUrl);
  }
  // код з конспекту:
  // useEffect(() => {
  //   if (profilePhotoUrl) {
  //     setPreviewUrl(profilePhotoUrl);
  //   }
  // }, [profilePhotoUrl]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError("");
    if (file) {
      // Перевіряємо тип файлу
      if (!file.type.startsWith("image/")) {
        setError("Only images");
        return;
      }
      // Перевіряємо розмір файлу (максимум 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Max file size 5MB");
        return;
      }

      onChangePhoto(file); // передаємо файл у батьківський компонент

      // для отримання url з файлу використовуємо FileReader
      // створюємо екземпляр FileReader
      const reader = new FileReader();
      // в метод onloadend додаємо логіку оновлення стану previewUrl
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      // викликаємо readAsDataURL передаючи у нього файл
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    onChangePhoto(null); // очищуємо батьківський стан
    setPreviewUrl("");
  };

  return (
    <div>
      <div className={css.picker}>
        {/* Відображаємо прев'ю якщо зображення існує */}
        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Preview"
            width={300}
            height={300}
            className={css.avatar}
          />
        )}
        <label
          className={previewUrl ? `${css.wrapper} ${css.reload}` : css.wrapper}
        >
          📷 Choose photo
          {/* Цей інпут має type="file" і приймає лише зображення - завдяки accept="image/*" */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={css.input}
          />
        </label>
        {previewUrl && (
          <button className={css.remove} onClick={handleRemove}>
            ❌
          </button>
        )}
      </div>
      {error && <p className={css.error}>{error}</p>}
    </div>
  );
};

export default AvatarPicker;
