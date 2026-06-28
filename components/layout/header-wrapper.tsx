import { getCategories } from "@/lib/data"
import { Header } from "./header"

export async function HeaderWrapper() {
  const categories = await getCategories()
  return <Header categories={categories} />
}
