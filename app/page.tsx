import { fetchRecipes } from "@/lib/api/serverApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ManePageClient from "./ManePage.Client";

export default async function ManePage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", { search: "", page: 1 }],
    queryFn: () => fetchRecipes({ search: "", page: 1, perPage: 12 }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ManePageClient />
    </HydrationBoundary>
  );
}
