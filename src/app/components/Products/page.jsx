import { Suspense } from "react";
import ProductCard from "./ProductCard";
import { HomeProductSkeleton } from "./ProductGridSkeleton";

export const metadata = {
  title: "সব পণ্য",
};

const ProductGroup = ({ title, products, id }) =>
  products.length > 0 && (
    <section aria-label={title} id={id} className={id ? "scroll-mt-6" : undefined}>
      <h3 className="mb-4 text-xl font-semibold sm:text-2xl">{title}</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );

const ProductCards = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load products: ${response.status} ${response.statusText}`,
    );
  }

  const products = await response.json();

  if (!Array.isArray(products)) {
    throw new Error("Invalid products response: expected an array");
  }

  for (const product of products) {
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

  const increasedProducts = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const decreasedProducts = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <div className="space-y-10">
      <section aria-label="সবচেয়ে বেশি দামের পরিবর্তন" className="space-y-8">
        <ProductGroup title="আজ দাম বেরছে" products={increasedProducts} />
        <ProductGroup title="আজ দাম কমেছে" products={decreasedProducts} />
      </section>
      <ProductGroup
        title={`মোট ${products.length}টি পণ্য`}
        products={products}
        id="all-products"
      />
    </div>
  );
};

const ProductsPage = () => (
  <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
    <Suspense fallback={<HomeProductSkeleton />}>
      <ProductCards />
    </Suspense>
  </section>
);

export default ProductsPage;
