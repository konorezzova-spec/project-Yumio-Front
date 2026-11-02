import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchRecipes } from "@/lib/api/serverApi";
import RecipesClient from "./Recipes.client";
import { connection } from "next/server";
// import { connection } from "next/server";
// import { Metadata } from "next";

interface ManePageProps {
  params: Promise<{
    slug: string[];
  }>;
}

// export async function generateMetadata({
//   params,
// }: ManePageProps): Promise<Metadata> {
//   const { slug } = await params;
//   return {
//     metadataBase: new URL("https://"),
//     title: `Category: ${slug[0]}`,
//     description: `Recipes filtered by category: ${slug[0]}`,
//     openGraph: {
//       title: `Category: ${slug[0]}`,
//       description: `Recipes filtered by category: ${slug[0]}`,
//       url: `/filter/${slug[0]}`,
//       siteName: "Yumio",
//       images: [
//         {
//           url: "https://",
//           width: 1200,
//           height: 630,
//           alt: `Category: ${slug[0]}`,
//         },
//       ],
//       type: "article",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: `Category: ${slug[0]}`,
//       description: `Recipes filtered by category: ${slug[0]}`,
//       images: ["https://"],
//     },
//   };
// }

export default async function RecipesPage({ params }: ManePageProps) {
  const { slug } = await params;

  const category = slug[0] === "all" ? undefined : slug[0];
  const queryClient = new QueryClient();

  await queryClient
    .query({
      queryKey: ["Recipes", { search: "", page: 1, perPage: 12, category }],
      queryFn: () =>
        fetchRecipes({
          search: "",
          page: 1,
          perPage: 12,
          category,
        }),
    })
    .catch(() => {});

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RecipesClient category={category} />
      </HydrationBoundary>
    </>
  );
}
