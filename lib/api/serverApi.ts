import { cookies } from "next/headers";
import { nextServer } from "./api";
import {
  RecipeId,
  type RecipesHttpResponse,
  type fetchParams,
} from "./clientApi";
import { Recipe } from "@/types/recipe";
import { User } from "@/types/user";

export const fetchRecipes = async (
  fetchParams: fetchParams
): Promise<RecipesHttpResponse> => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await nextServer.get<RecipesHttpResponse>("/recipes", {
    params: fetchParams,
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const fetchRecipeById = async (id: RecipeId): Promise<Recipe> => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await nextServer.get<Recipe>(`/recipes/${id}`, {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const checkServerSession = async () => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб proxy мав доступ до нових cookie
  return res;
};

export const getMe = async () => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
