import { redirect } from "next/navigation";

export default async function ManePage() {
  redirect("/recipes/filter/all");
  return null;
}
