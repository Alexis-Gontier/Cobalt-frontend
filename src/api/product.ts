import axiosConfig from "./axiosConfig";

export const product = async (
  id: string,
  titre: string,
  description: string,
  prix: number,
  quantite: number,
  image_url: string
) => {
  const response = await axiosConfig.get("/", {
    params: { id, titre, description, prix, quantite, image_url },
  });
  return response.data;
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