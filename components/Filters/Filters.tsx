"use client";

import Image from "next/image";
import Container from "../Container/Container";
import css from "./Filter.module.css";
import filter from "/public/filter.svg";
import close from "/public/close.svg";
import { Form, Formik, Field, FormikHelpers } from "formik";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Category, Ingredient } from "@/types/recipe";

interface FilterProps {
  total: number;
  categories: Category[];
  ingredients: Ingredient[];
  currentCategory?: string;
}

interface FilterFormValues {
  category: string;
  ingredient: string;
}

const initialValues: FilterFormValues = {
  category: "",
  ingredient: "",
};

export default function Filters({
  total,
  categories,
  currentCategory,
  ingredients,
}: FilterProps) {
  const router = useRouter();

  const [isFilterClose, setIsFilterClose] = useState(true);

  const toggleFilter = () => {
    setIsFilterClose(prev => !prev);
  };

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const search = searchParams.get("search") ?? "";
  console.log(search);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name === "category") {
      const category = value || "all";
      router.push(`/recipes/filter/${category}?${params.toString()}`);
      return;
    }
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSubmit = (
    values: FilterFormValues,
    actions: FormikHelpers<FilterFormValues>
  ) => {
    actions.resetForm();
    params.delete("search");
    toggleFilter();
    router.push(`/recipes/filter/all`);
  };

  return (
    <Container className={css.filter_container}>
      {search ? (
        <h2>Search Results for &quot;{search}&quot;</h2>
      ) : (
        <h2>Recipes</h2>
      )}
      <div className={css.filter_line}>
        <p className={css.filter_recipes}>{total} recipes</p>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <div
            className={css.filter_box}
            style={{ display: isFilterClose ? "none" : "flex" }}
          >
            <Form className={css.filter_form_desktop}>
              <button type="submit" className={css.filter_submit}>
                Reset filters
              </button>

              <Field
                as="select"
                name="category"
                className={css.filter_select}
                value={currentCategory || ""}
                onChange={handleChange}
              >
                <option value="">Category</option>
                {categories.map(category => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Field>
              <Field
                as="select"
                name="ingredient"
                className={css.filter_select}
                value={searchParams.get("ingredient") || ""}
                onChange={handleChange}
              >
                <option value="">Ingredient</option>
                {ingredients.map(ingredient => (
                  <option key={ingredient._id} value={ingredient.name}>
                    {ingredient.name}
                  </option>
                ))}
              </Field>
            </Form>
          </div>
        </Formik>
        <button
          type="button"
          className={css.filter_button}
          onClick={toggleFilter}
        >
          Filter{" "}
          {isFilterClose ? (
            <Image
              className={css.filter_icon}
              src={filter}
              width={24}
              height={24}
              alt="open filter"
            ></Image>
          ) : (
            <Image
              className={css.filter_icon}
              src={close}
              width={24}
              height={24}
              alt="close filter"
            ></Image>
          )}
        </button>
      </div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <div
          className={css.filter_box}
          style={{ display: isFilterClose ? "none" : "flex" }}
        >
          <Form className={css.filter_form_mobile}>
            <Field
              as="select"
              name="category"
              className={css.filter_select}
              value={currentCategory || ""}
              onChange={handleChange}
            >
              <option value="">Category</option>
              {categories.map(category => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Field>
            <Field
              as="select"
              name="ingredient"
              className={css.filter_select}
              value={searchParams.get("ingredient") || ""}
              onChange={handleChange}
            >
              <option value="">Ingredient</option>
              {ingredients.map(ingredient => (
                <option key={ingredient._id} value={ingredient.name}>
                  {ingredient.name}
                </option>
              ))}
            </Field>
            <button type="submit" className={css.filter_submit}>
              Reset filters
            </button>
          </Form>
        </div>
      </Formik>
    </Container>
  );
}
