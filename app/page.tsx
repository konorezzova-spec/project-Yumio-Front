// import { fetchRecipes } from "@/lib/api/serverApi";
// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
// } from "@tanstack/react-query";
// import ManePageClient from "./ManePage.Client";
// import { connection } from "next/server";

import { redirect } from "next/navigation";

export default async function ManePage() {
  redirect("/recipes/filter/all");
  return null;
  // await connection();
  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["recipes", { search: "", page: 1, perPage: 12 }],
  //   queryFn: () => fetchRecipes({ search: "", page: 1, perPage: 12 }),
  // });
  // return (
  //   <HydrationBoundary state={dehydrate(queryClient)}>
  //     <ManePageClient />
  //   </HydrationBoundary>
  // );
}
