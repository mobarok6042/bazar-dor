import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata = {
  title: "পণ্যের বিস্তারিত",
  description: "পণ্যের বাজারভিত্তিক দাম ও মূল্যসারাংশ দেখুন।",
};

const ProductDetails = async ({ params }) => {
  const { slug } = await params;
  const response = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
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

  const product = products.find((item) => item.slug === slug);
  if (!product) {
    notFound();
  }

  if (
    typeof product.nameBn !== "string" ||
    typeof product.categoryNameBn !== "string" ||
    typeof product.unit !== "string" ||
    typeof product.today !== "number" ||
    typeof product.yesterday !== "number" ||
    typeof product.change?.pct !== "number" ||
    !Array.isArray(product.markets)
  ) {
    throw new Error("Invalid product entry: missing details or market prices");
  }

  for (const market of product.markets) {
    if (
      typeof market.market !== "string" ||
      typeof market.division !== "string" ||
      typeof market.min !== "number" ||
      typeof market.max !== "number"
    ) {
      throw new Error("Invalid market entry: expected market, division, min, and max");
    }
  }

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const difference = product.today - product.yesterday;
  const changeColor = isUp ? "text-error" : isDown ? "text-success" : "text-base-content";
  const lowestPrice = product.markets.length
    ? Math.min(...product.markets.map((market) => market.min))
    : null;
  const highestPrice = product.markets.length
    ? Math.max(...product.markets.map((market) => market.max))
    : null;
  const averagePrice = product.markets.length
    ? product.markets.reduce((sum, market) => sum + (market.min + market.max) / 2, 0) /
      product.markets.length
    : null;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body flex-col items-start justify-between gap-6 p-5 sm:flex-row sm:items-center sm:p-8">
          <div className="flex min-w-0 items-center gap-4">
            <span aria-hidden="true" className="text-5xl sm:text-6xl">
              {product.categoryIcon || product.image || "🛒"}
            </span>
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">{product.nameBn}</h1>
              <p className="mt-1 text-base-content/70">
                {product.categoryNameBn} · প্রতি {product.unit}
              </p>
              <p className={`mt-2 text-sm ${changeColor}`}>
                গতকালের তুলনায় {difference > 0 ? "+" : difference < 0 ? "-" : ""}৳{Math.abs(difference)}
              </p>
            </div>
          </div>
          <div className="sm:text-right">
            <p className="text-sm text-base-content/65">আজকের দাম</p>
            <p className="text-3xl font-bold tabular-nums">৳{product.today}</p>
            <p className={`mt-1 inline-flex items-center gap-1 font-semibold ${changeColor}`}>
              {isUp && <span aria-hidden="true">▲</span>}
              {isDown && <span aria-hidden="true">▼</span>}
              <span>{isUp ? "+" : ""}{product.change.pct}%</span>
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="price-summary-heading">
        <h2 id="price-summary-heading" className="mb-3 text-xl font-semibold">
          দামের সারসংক্ষেপ
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "সর্বনিম্ন দাম", price: lowestPrice },
            { label: "সর্বোচ্চ দাম", price: highestPrice },
            { label: "গড় দাম", price: averagePrice },
          ].map(({ label, price }) => (
            <div key={label} className="rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm">
              <p className="text-sm text-base-content/65">{label}</p>
              <p className="mt-2 text-2xl font-bold tabular-nums">
                {price === null ? "—" : `৳${Math.round(price)}`}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="market-prices-heading">
        <h2 id="market-prices-heading" className="mb-3 text-xl font-semibold">
          বাজারভিত্তিক দাম
        </h2>
        <div className="overflow-x-auto rounded-xl border border-base-300 bg-base-100">
          <table className="table">
            <thead>
              <tr>
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th>সর্বনিম্ন</th>
                <th>সর্বোচ্চ</th>
              </tr>
            </thead>
            <tbody>
              {product.markets.map((market, index) => (
                <tr key={`${market.market}-${market.division}-${index}`}>
                  <td>{market.market}</td>
                  <td>{market.division}</td>
                  <td>৳{market.min}</td>
                  <td>৳{market.max}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

const ProductsDetailPage = ({ params }) => (
  <Suspense fallback={<main aria-hidden="true" className="mx-auto h-screen max-w-7xl px-4 py-8" />}>
    <ProductDetails params={params} />
  </Suspense>
);

export default ProductsDetailPage;
