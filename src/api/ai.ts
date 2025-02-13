import axiosConfig from "./axiosConfig";

export interface AiResponse {
  answer: string;
}

export const getAiResponse = async (message: string): Promise<AiResponse> => {
  try {
    const response = await axiosConfig.post("/ia/search", {
      demande: message,
    });
    console.log(response.data);
    return { answer: response.data.resultat };
  } catch (error) {
    console.error("Error getting AI response:", error);
    throw new Error("Failed to get AI response");
  }
};
