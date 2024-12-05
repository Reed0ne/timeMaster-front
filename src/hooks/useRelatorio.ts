import axiosApi from "@/config/axios.config";
import IRelatorio from "@/types/IRelatorio";
import dotenv from "dotenv";

dotenv.config();

const getRelatorio = async (): Promise<IRelatorio> => {
  try {
    const response = await axiosApi.get(`/relatorio`);
    return response.data;
  } catch (error) {
    console.error("Erro ao pegar atividades", error);
    throw new Error("Falha ao pegar atividades");
  }
};

export { getRelatorio };
