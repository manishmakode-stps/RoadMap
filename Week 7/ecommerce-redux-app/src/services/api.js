import axios from "axios";

export const fetchProductsAPI = async () => {
  const response = await axios.get("https://fakestoreapi.com/products");

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.data;
};