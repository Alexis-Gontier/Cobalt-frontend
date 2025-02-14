import axiosConfig from "./axiosConfig";

export interface AiResponse {
  resultat: string;
  title: string;
}

export const getAiResponse = async (message: string): Promise<AiResponse> => {
  try {
    const response = await axiosConfig.post("/ia/search", {
      demande: message,
    });
    console.log(response.data);
    return { resultat: response.data.resultat, title: response.data.title };
  } catch (error) {
    console.error("Error getting AI response:", error);
    throw new Error("Failed to get AI response");
  }
};
