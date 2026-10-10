"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

const CategoryProductList = ({ category, products }) => {
  const [sortOrder, setSortOrder] = useState("default");
  const sortedProducts = useMemo(() => {
    if (sortOrder === "price-ascending") {
      return [...products].sort((a, b) => a.today - b.today);
    }

    if (sortOrder === "price-descending") {
      return [...products].sort((a, b) => b.today - a.today);
    }

    return products;
  }, [products, sortOrder]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold sm:text-3xl">
            {category.icon && <span aria-hidden="true">{category.icon}</span>}
            {category.nameBn}
          </h1>
          <p className="mt-1 text-sm text-base-content/70">
            {category.nameBn} বিভাগের {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
        <label className="form-control w-full sm:w-auto">
          <span className="label-text mb-1 text-sm">দাম অনুযায়ী সাজান</span>
          <select
            className="select select-bordered w-full sm:min-w-56"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            aria-label="পণ্যের দাম অনুযায়ী সাজান"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-ascending">দাম: কম থেকে বেশি</option>
            <option value="price-descending">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-base-300 p-6 text-center text-base-content/70">
          এই বিভাগে কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
};

export default CategoryProductList;
