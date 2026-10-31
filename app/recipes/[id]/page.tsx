import { fetchRecipeById } from "@/lib/api/serverApi";
import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const recipe = await fetchRecipeById(id);

  return {
    title: `${recipe.title} | Yumio`,
    description: recipe.description,
  };
}

async function DynamicMarker() {
  await connection();
  return null;
}
export default function RecipePage() {
  return (
    <>
      {" "}
      <Suspense fallback={null}>
        <DynamicMarker />
      </Suspense>
      Recipe Page
    </>
  );
}
