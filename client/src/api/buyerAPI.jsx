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
    return response.data
  } catch (error) {
    console.error("Error adding to cart:", error);
    return null;
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

export const updateCart = async (buyerID, productID, quantity) => {
  try {
    const response = await api.put(`/buyer/${buyerID}/cart/update`, {
      productId: productID,
      quantity,
    });
    return true;
  } catch (error) {
    console.error("Error updating cart:", error);
    return false;
  }
}

export const removeFromCart = async (buyerID, productID) => {
  try {
    const response = await api.put(`/buyer/${buyerID}/cart/remove`, {
      productId: productID,
    });
    return true;
  } catch (error) {
    console.error("Error removing from cart:", error);
    return false;
  }
}

export const getShippingInfo = async (buyerID) => {
  try {
    const response = await api.get(`/buyer/${buyerID}/shippingInfo`);
    return response.data;
  } catch (error) {
    console.error("Error fetching shipping info:", error);
    return null;
  }
}

export const proceedWithCheckout = async (buyerID, paymentMethod, productId) => {
  try {
    const response = await api.post(`/buyer/${buyerID}/checkout`, {
      paymentMethod,
      productId,
    });
    return response.data;
  } catch (error) {
    console.error("Error proceeding with checkout:", error);
    return null;
  }
}

export const getAllOrdersByStatus = async (buyerID, status) => {
  try {
    const response = await api.get(`/buyer/${buyerID}/order/${status}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders by status:", error);
    return null;
  }
}
