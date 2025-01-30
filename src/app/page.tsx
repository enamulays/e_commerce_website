import Banner from "@/base/home/Banner";
import ProductsList from "@/base/home/ProductsList";
import { getData } from "@/api";

export default async function Home() {
  const endPoint = "https://dummyjson.com/products";
  const { products } = await getData(endPoint);

  // const endPoint2 = "http://localhost:8000/api/quotes";
  // const data = await getData(endPoint2);
  // console.log(data)

  return (
    <main>
      <Banner />
      <ProductsList products={products} />
    </main>
  );
}
