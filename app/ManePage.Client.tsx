"use client";

import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Filters from "@/components/Filters/Filters";
import Loader from "@/components/Loader/Loader";
import Pagination from "@/components/Pagination/Pugination";
import RecipesList from "@/components/RecipesList/RecipesList";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchRecipes } from "@/lib/api/clientApi";
import { useSearchStore } from "@/lib/store/searchStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ManePageClient() {
  const router = useRouter();
  const setSearch = useSearchStore(state => state.setSearch);

  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["Recipes", { search: "", page: 1, perPage: 12 }],
    queryFn: () =>
      fetchRecipes({
        search: "",
        page: currentPage,
        perPage: 12,
      }),
    retry: 1,
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const getSearchQuery = (search: string) => {
    setSearch(search);
    router.push("/recipes");
  };

  return (
    <>
      <SearchBox onSubmit={getSearchQuery} />
      {isSuccess && <Filters total={data.totalItems} />}
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
