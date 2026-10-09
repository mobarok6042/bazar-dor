import BannerPage from "./components/Banner/page";
import ProductsPage from "./components/Products/page";

const page = () => {
  return (
    <main>
      <BannerPage></BannerPage>
      <ProductsPage />
    </main>
  );
};

export default page;