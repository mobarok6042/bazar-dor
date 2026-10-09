import { Suspense } from "react";

const ProductCard = ({ product }) => {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const changeSign = isUp ? "+" : isDown ? "-" : "";
  const changeColor = isUp ? "text-error" : isDown ? "text-success" : "";

  return (
    <article className="card border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body gap-2 p-5">
        <div className="flex items-center gap-2 text-lg font-semibold sm:text-xl">
          {product.categoryIcon && (
            <span aria-hidden="true">{product.categoryIcon}</span>
          )}
          <h3 className="min-w-0">{product.nameBn}</h3>
        </div>
        <p className="text-sm text-base-content/70">per {product.unit}</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-sm text-base-content/60">আজকের দাম</span>
          <span className="text-lg font-semibold tabular-nums">
            ৳{product.today}
          </span>
        </div>
        <div className="mt-2 flex justify-end">
          <span
            className={`badge badge-outline inline-flex gap-1 ${changeColor}`}
          >
            {isUp && <span aria-hidden="true">▲</span>}
            {isDown && <span aria-hidden="true">▼</span>}
            <span>
              {changeSign}
              {product.change.pct}%
            </span>
          </span>
        </div>
      </div>
    </article>
  );
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
    "https://api.api-store.workers.dev/api/bazardor/products",
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
        title={`মত (${products.length}টি) পন্য দেখানো হচ্ছে`}
        products={products}
        id="all-products"
      />
    </div>
  );
};

const ProductsPage = () => (
  <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
    <Suspense fallback={<div aria-hidden="true" className="h-64" />}>
      <ProductCards />
    </Suspense>
  </section>
);

export default ProductsPage;
