

export async function getData(endPoint: string) {
  const response = await fetch(endPoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = response.json();
  return data;
}

export async function singleProductData() {
  return await getData("https://fakestoreapi.com/products/1");
}


