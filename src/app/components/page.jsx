import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CategoryLinks = async () => {
    const response = await fetch("https://api.api-store.workers.dev/api/bazardor/categories");

    if (!response.ok) {
        throw new Error(`Failed to load categories: ${response.status} ${response.statusText}`);
    }

    const navs = await response.json();

    if (!Array.isArray(navs)) {
        throw new Error("Invalid categories response: expected an array");
    }

    return (
        <nav aria-label="Categories" className="mx-auto flex flex-wrap justify-center gap-4 px-4 pb-3 text-center sm:px-6 lg:px-8">
            {navs.map((nav) => {
                if (typeof nav.slug !== "string" || typeof nav.nameBn !== "string") {
                    throw new Error("Invalid category entry: each category must include a slug and nameBn");
                }

                return (
                    <Link href={`/${nav.slug}`} key={nav.id ?? nav.slug} className="link link-hover inline-flex items-center gap-1">
                        {nav.icon && <span aria-hidden="true">{nav.icon}</span>}
                        <span>{nav.nameBn}</span>
                    </Link>
                );
            })}
        </nav>
    );
};

const NavlinksPage = () => (
    <Suspense fallback={<nav aria-label="Categories" className="h-8" />}>
        <CategoryLinks />
    </Suspense>
);

export default NavlinksPage;