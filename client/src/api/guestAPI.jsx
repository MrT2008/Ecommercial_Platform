import api from "./axios";


export const getShopByProductId = async (productId) => {
  try {
    const response = await api.get(`/product/shop/${productId}`);
    // backend trả về { message, allProducts: [...] }
    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
}

export const getAllProducts = async () => {
  try {
    const { data } = await api.get("/guest/product");
    // backend trả về { message, allProducts: [...] }
    return Array.isArray(data.allProducts) ? data.allProducts : [];
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/guest/product/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
}

export const getShopById = async (id) => {
  try {
    const response = await api.get(`/guest/shop/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching shop by ID:", error);
    return null;
  }
}