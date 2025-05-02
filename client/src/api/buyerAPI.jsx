import api from "./axios";

export const createShop = async (shopData, buyerID) => {
  try {
    const response = await api.post(`/buyer/${buyerID}/shop/create`, shopData)
    if ((response.status === 201)||(response.status === 200)) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error creating shop:", error);
    return false;
  }
}
export const addToCart = async (buyerID, productID, quantity) => {
  try {
    const response = await api.post(`/buyer/${buyerID}/product/addToCart`, {
      productId: productID,
      quantity,
    });
    console.log("Response from addToCart:", response.data);
    return true;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return false;
  }
}

export const getCartById = async (buyerID) => {
  try {
    const response = await api.get(`/buyer/${buyerID}/cart`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
}

export const getBuyerProfile = async(buyerID) => {
  try {
    const response = await api.get(`buyer/${buyerID}/viewProfile`);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
}

