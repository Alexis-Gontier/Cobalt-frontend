import axiosConfig from "./axiosConfig";

export const fetchProducts = async () => {
  try {
      const response = await axiosConfig.get("/products");
      return response.data;
  } catch (error) {
      console.error("Error fetching products:", error);
      return [];
  }
}

export const fetchProductsById = async (id: string) => {
  try {
      const response = await axiosConfig.get(`/products/${id}`);
      return response.data;
  } catch (error) {
      console.error("Error fetching product:", error);
      return [];
  }
}

export const exportProduct = async (
  id: string,
  titre: string,
  description: string,
  prix: number,
  quantite: number,
  image_url: string
) => {
  const response = await axiosConfig.post("/", {
    params: { id, titre, description, prix, quantite, image_url },
  })
  return response.data;
}