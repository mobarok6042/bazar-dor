import { Suspense } from "react";
import { notFound } from "next/navigation";
import CategoryProductList from "../components/Products/CategoryProductList";

const CategoryContent = async ({ params }) => {
  const { category: categorySlug } = await params;
  const [categoriesResponse, productsResponse] = await Promise.all([
    fetch("https://api.abcz.workers.dev/api/bazardor/categories"),
    fetch("https://api.abcz.workers.dev/api/bazardor/products"),
  ]);

  if (!categoriesResponse.ok) {
    throw new Error(
      `Failed to load categories: ${categoriesResponse.status} ${categoriesResponse.statusText}`,
    );
  }
  if (!productsResponse.ok) {
    throw new Error(
      `Failed to load products: ${productsResponse.status} ${productsResponse.statusText}`,
    );
  }

  const [categories, products] = await Promise.all([
    categoriesResponse.json(),
    productsResponse.json(),
  ]);

  if (!Array.isArray(categories) || !Array.isArray(products)) {
    throw new Error("Invalid API response: expected category and product arrays");
  }

  const category = categories.find((item) => item.slug === categorySlug);
  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(
    (product) => product.category === category.slug,
  );

  for (const product of categoryProducts) {
    if (
      (typeof product.id !== "string" && typeof product.id !== "number") ||
      typeof product.slug !== "string" ||
      typeof product.nameBn !== "string" ||
      typeof product.today !== "number" ||
      typeof product.unit !== "string" ||
      typeof product.change?.pct !== "number"
    ) {
      throw new Error(
        "Invalid product entry: expected id, nameBn, today, unit, and change.pct",
      );
    }
  }

  return (
    <CategoryProductList category={category} products={categoryProducts} />
  );
};

const CategoryPage = ({ params }) => (
  <main>
    <Suspense fallback={<div aria-hidden="true" className="h-96" />}>
      <CategoryContent params={params} />
    </Suspense>
  </main>
);

export default CategoryPage;
