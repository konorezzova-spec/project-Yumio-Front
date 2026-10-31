import { Recipe } from "@/types/recipe";
import { nextServer } from "./api";
import { User } from "@/types/user";

export type RecipeId = Recipe["_id"];

export interface fetchParams {
  search: string;
  page: number;
  perPage: number;
  category?: string;
  sortBy?: string;
}
export interface RecipesHttpResponse {
  recipes: Recipe[];
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
}

// має виконувати запит для отримання колекції загальних рецептів із сервера.

export const fetchRecipes = async (
  fetchParams: fetchParams
): Promise<RecipesHttpResponse> => {
  const response = await nextServer.get<RecipesHttpResponse>("/recipes", {
    params: fetchParams,
  });
  return response.data;
};

// має виконувати запит для створення нового рецепта на сервері. Приймає вміст рецептa, повертає новий рецепт

export type CreateRecipeParams = Pick<
  Recipe,
  | "title"
  | "category"
  | "area"
  | "instructions"
  | "description"
  | "time"
  | "ingredients"
>;

export const createRecipe = async (
  recipe: CreateRecipeParams
): Promise<Recipe> => {
  const response = await nextServer.post<Recipe>("/me/recipes", recipe);
  return response.data;
};

// має виконувати запит для видалення рецепту за заданим ідентифікатором. Приймає ID рецепта та повертає інформацію про видалений рецепт у відповіді.

export const deleteRecipe = async (id: RecipeId): Promise<Recipe> => {
  const response = await nextServer.delete<Recipe>(`/me/recipes/delete/${id}`);
  return response.data;
};

export const fetchRecipeById = async (id: RecipeId): Promise<Recipe> => {
  const response = await nextServer.get<Recipe>(`/recipes/${id}`);
  return response.data;
};

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export interface LoginRequest {
  email: string;
  password: string;
}

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export interface UpdateUserRequest {
  name?: string;
  avatar?: string;
}

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>("/users/me", payload);
  return res.data;
};
// export const updateMe = async (name: string) => {
//   const { data } = await nextServer.patch<User>("/users/me", {
//     name: name,
//   });
//   return data;
// };
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await nextServer.post("/upload", formData);
  return data.url;
};
