import { Suspense } from 'react';
import CategoryNavLinks from './CategoryNavLinks';

export const metadata = {
    title: 'পণ্যের বিভাগসমূহ',
};

const CategoryLinks = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");

    if (!response.ok) {
        throw new Error(`Failed to load categories: ${response.status} ${response.statusText}`);
    }

    const navs = await response.json();

    if (!Array.isArray(navs)) {
        throw new Error("Invalid categories response: expected an array");
    }

    for (const nav of navs) {
        if (typeof nav.slug !== "string" || typeof nav.nameBn !== "string") {
            throw new Error("Invalid category entry: each category must include a slug and nameBn");
        }
    }

    return <CategoryNavLinks categories={navs} />;
};

const NavlinksPage = () => (
    <Suspense fallback={<nav aria-label="পণ্যের বিভাগ" className="h-8" />}>
        <CategoryLinks />
    </Suspense>
);

export default NavlinksPage;