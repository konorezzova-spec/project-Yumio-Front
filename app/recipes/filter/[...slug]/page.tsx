import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchRecipes } from "@/lib/api/serverApi";
import RecipesClient from "./Recipes.client";
import { Metadata } from "next";
import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";
import { connection } from "next/server";

const SITE_URL = process.env.SITE_URL || "/";

interface ManePageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({
  params,
}: ManePageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    metadataBase: new URL(SITE_URL),
    title: `Category: ${slug[0]}`,
    description: `Recipes filtered by category: ${slug[0]}`,
    openGraph: {
      title: `Category: ${slug[0]}`,
      description: `Recipes filtered by category: ${slug[0]}`,
      url: `${SITE_URL}/recipes/filter/${slug[0]}`,
      siteName: "Yumio",
      images: [
        {
          url: "https://res.cloudinary.com/rvojizer/image/upload/v1793620526/main_picture.jpg.png",
          width: 1200,
          height: 630,
          alt: `Category: ${slug[0]}`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `Category: ${slug[0]}`,
      description: `Recipes filtered by category: ${slug[0]}`,
      images: [
        "https://res.cloudinary.com/rvojizer/image/upload/v1793620526/main_picture.jpg.png",
      ],
    },
  };
}

export default function RecipesPage({ params }: ManePageProps) {
  return (
    <Suspense fallback={<Loader />}>
      <RecipesContent params={params} />
    </Suspense>
  );
}
async function RecipesContent({ params }: ManePageProps) {
  const { slug } = await params;
  await connection();

  const category = slug[0] === "all" ? undefined : slug[0];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["Recipes", { search: "", page: 1, perPage: 12, category }],
    queryFn: () =>
      fetchRecipes({
        search: "",
        page: 1,
        perPage: 12,
        category,
      }),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RecipesClient category={category} />
      </HydrationBoundary>
    </>
  );
}
