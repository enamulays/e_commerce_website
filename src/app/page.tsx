import Banner from "@/base/home/Banner";
import ProductsList from "@/base/home/ProductsList";
import { getData } from "@/helpers";

export default async function Home() {
  const endPoint = "https://dummyjson.com/products";
  const { products } = await getData(endPoint);

  return (
    <main>
      <Banner />
      <ProductsList products={products} />
    </main>
  );
}
