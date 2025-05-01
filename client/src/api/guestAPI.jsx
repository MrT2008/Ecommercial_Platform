import api from "./axios";


export const getAllProducts = async () => {
  try {
    const response = await api.get("/guest/product");
    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    return null;
  }
}

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/guest/product/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
}