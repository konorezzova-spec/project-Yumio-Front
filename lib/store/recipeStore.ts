import { create } from "zustand";
import type { CreateRecipeParams } from "../api/clientApi";
import { persist } from "zustand/middleware";

interface RecipeDraftStore {
  draft: CreateRecipeParams;
  setDraft: (recipe: CreateRecipeParams) => void;
  clearDraft: () => void;
}

const initialDraft: CreateRecipeParams = {
  title: "",
  category: "",
  area: "",
  instructions: "",
  description: "",
  time: 0,
  ingredients: [],
};

export const useRecipeStore = create<RecipeDraftStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: recipe => set(() => ({ draft: recipe })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      // Ключ у localStorage
      name: "recipe-draft",
      // Зберігаємо лише властивість draft
      partialize: state => ({ draft: state.draft }),
    }
  )
);
