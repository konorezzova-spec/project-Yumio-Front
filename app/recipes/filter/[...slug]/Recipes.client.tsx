"use client";

import { useState } from "react";
import css from "./Recipes.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import SearchBox from "@/components/SearchBox/SearchBox";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import { fetchRecipes } from "@/lib/api/clientApi";
import Pagination from "@/components/Pagination/Pugination";
import Filters from "@/components/Filters/Filters";
import Container from "@/components/Container/Container";
import RecipesList from "@/components/RecipesList/RecipesList";

interface RecipesClientProps {
  category: undefined | string;
}

export default function RecipesClient({ category }: RecipesClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["Recipes", { search: searchQuery, page: currentPage, category }],
    queryFn: () =>
      fetchRecipes({
        search: searchQuery,
        page: currentPage,
        perPage: 12,
        category,
      }),
    enabled: true,
    retry: 1,
    placeholderData: keepPreviousData,
  });

  const updateSearchQuery = (search: string) => {
    setSearchQuery(search);
    setCurrentPage(1);
  };

  const totalPages = data?.totalPages ?? 0;

  return (
    <>
      <Container className={css.app}>
        <SearchBox onSubmit={updateSearchQuery} />
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
      </Container>
    </>
  );
}
