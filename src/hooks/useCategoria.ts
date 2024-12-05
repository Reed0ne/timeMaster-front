import axiosApi from "@/config/axios.config";
import ICategoria from "@/types/ICategoria";
import dotenv from "dotenv";

dotenv.config();

const getCategorias = async (): Promise<ICategoria[]> => {
  try {
    const response = await axiosApi.get(`/categorias`);
    return response.data;
  } catch (error) {
    console.error("Erro ao pegar atividades", error);
    throw new Error("Falha ao pegar atividades");
  }
};

export { getCategorias };
