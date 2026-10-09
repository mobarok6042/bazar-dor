"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const CategoryNavLinks = ({ categories }) => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Categories"
      className="mx-auto flex flex-wrap justify-center gap-2 px-4 pb-3 text-center sm:px-6 lg:px-8"
    >
      {categories.map((category) => {
        const isActive = pathname === `/${category.slug}`;

        return (
          <Link
            href={`/${category.slug}`}
            key={category.id ?? category.slug}
            aria-current={isActive ? "page" : undefined}
            className={`inline-flex items-center gap-1 rounded-md px-3 py-1.5 transition-colors ${
              isActive
                ? "bg-[#047F39] text-white"
                : "link link-hover"
            }`}
          >
            {category.icon && (
              <span aria-hidden="true">{category.icon}</span>
            )}
            <span>{category.nameBn}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default CategoryNavLinks;
