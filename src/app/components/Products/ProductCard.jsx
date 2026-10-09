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
          <span className={`badge badge-outline inline-flex gap-1 ${changeColor}`}>
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

export default ProductCard;
