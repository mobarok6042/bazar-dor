import { Suspense } from 'react';

const ProductMarquee = async () => {
    const response = await fetch("https://api.api-store.workers.dev/api/bazardor/products");

    if (!response.ok) {
        throw new Error(`Failed to load products: ${response.status} ${response.statusText}`);
    }

    const goods = await response.json();

    if (!Array.isArray(goods)) {
        throw new Error("Invalid products response: expected an array");
    }

    const productItems = goods.map((good) => {
                if (
                    (typeof good.id !== "string" && typeof good.id !== "number") ||
                    typeof good.nameBn !== "string" ||
                    typeof good.today !== "number" ||
                    typeof good.change?.pct !== "number"
                ) {
                    throw new Error("Invalid product entry: expected id, nameBn, today, and change.pct");
                }

                const isUp = good.change.dir === "up";
                const isDown = good.change.dir === "down";
                const changeSign = isUp ? "+" : isDown ? "-" : "";
                const changeColor = isUp ? "text-error" : isDown ? "text-success" : "";

                return (
                    <div key={good.id} className="flex shrink-0 items-center gap-3 rounded-lg border border-base-300 px-4 py-2">
                        <span className="font-medium">{good.nameBn}</span>
                        <span>৳{good.today}</span>
                        <span className={`inline-flex items-center gap-1 ${changeColor}`}>
                            {isUp && <span aria-hidden="true">▲</span>}
                            {isDown && <span aria-hidden="true">▼</span>}
                            <span>{changeSign}{good.change.pct}%</span>
                        </span>
                    </div>
                );
            });

    return (
        <div
            aria-label="আজকের বাজার দর"
            className="product-marquee overflow-hidden px-3 py-3"
            role="region"
        >
            <div className="product-marquee__track flex w-max">
                <div className="flex shrink-0 gap-3 pr-3">
                    {productItems}
                </div>
                <div aria-hidden="true" className="flex shrink-0 gap-3 pr-3">
                    {productItems}
                </div>
            </div>
        </div>
    );
};

const MarqueePage = () => (
    <Suspense fallback={<div aria-hidden="true" className="h-16" />}>
        <ProductMarquee />
    </Suspense>
);

export default MarqueePage;