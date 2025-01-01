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
