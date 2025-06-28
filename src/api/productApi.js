import axios from "axios";

const BASE_URL = "https://dummyjson.com";

export const fetchProducts = async () => {
  const res = await axios.get(`${BASE_URL}/products`);
  return res.data.products;
};

export const fetchCategories = async () => {
  const res = await axios.get(`${BASE_URL}/products/categories`);
  console.log(res.data);
  return res.data;
};

export const fetchProductsByCategory = async (category) => {
  const res = await axios.get(`${BASE_URL}/products/category/${category}`);
  return res.data.products;
};
