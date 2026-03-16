import axios from "axios";

export const fetchProductsAPI = async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
};