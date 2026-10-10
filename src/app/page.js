import BannerPage from "./components/Banner/page";
import ProductsPage from "./components/Products/page";

export const metadata = {
  title: "আজকের বাজারদর",
  description: "বাংলাদেশের বাজারের পণ্যের আজকের দাম ও পরিবর্তন দেখুন।",
};

const page = () => {
  return (
    <main>
      <BannerPage></BannerPage>
      <ProductsPage />
    </main>
  );
};

export default page;