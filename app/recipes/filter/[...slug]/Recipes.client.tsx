"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import SearchBox from "@/components/SearchBox/SearchBox";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import { fetchRecipes } from "@/lib/api/clientApi";
import Pagination from "@/components/Pagination/Pugination";
import Filters from "@/components/Filters/Filters";
import RecipesList from "@/components/RecipesList/RecipesList";
import { Category, Ingredient } from "@/types/recipe";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface RecipesClientProps {
  categories: Category[];
  category: undefined | string;
  ingredients: Ingredient[];
  ingredient?: string;
}

export default function RecipesClient({
  category,
  categories,
  ingredients,
  ingredient,
}: RecipesClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("search") ?? ""
  );
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: [
      "Recipes",
      { search: searchQuery, page: currentPage, category, ingredient },
    ],
    queryFn: () =>
      fetchRecipes({
        search: searchQuery,
        page: currentPage,
        perPage: 12,
        category,
        ingredient,
      }),
    enabled: true,
    retry: 1,
    placeholderData: keepPreviousData,
  });

  const updateSearchQuery = (search: string) => {
    setSearchQuery(search);
    setCurrentPage(1);

    const params = new URLSearchParams(searchParams.toString());

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const totalPages = data?.totalPages ?? 0;

  return (
    <>
      <SearchBox onSubmit={updateSearchQuery} />
      {isSuccess && (
        <Filters
          total={data.totalItems}
          categories={categories}
          currentCategory={category}
          ingredients={ingredients}
        />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={error.message} />}

      {data && data.recipes.length > 0 && (
        <RecipesList recipes={data.recipes} />
      )}

      {isSuccess && totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}

      {data && data.recipes.length === 0 && <p>No Recipes found.</p>}
    </>
  );
}
