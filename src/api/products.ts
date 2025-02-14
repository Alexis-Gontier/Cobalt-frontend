import axiosConfig from "./axiosConfig";

export const fetchProducts = async () => {
  try {
    const response = await axiosConfig.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchProductById = async (id: string) => {
  try {
    const response = await axiosConfig.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return [];
  }
};
export const fetchProductByCategory = async (category: string) => {
  try {
    const response = await axiosConfig.get(`/products/products/${category}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return [];
  }
};
export const addToCart = async (id: string, userId: string) => {
  try {
    console.log(userId);
    const token = localStorage.getItem("token");
    const response = await axiosConfig.post(`/shopcart/${userId}`, {
      product_id: id,
      quantity: 1,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return [];
  }
};

export const getCart = async (userId: string) => {
  try {
    const response = await axiosConfig.get(`/shopcart/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting cart:", error);
    return [];
  }
};
