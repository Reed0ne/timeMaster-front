import axiosApi from "@/config/axios.config";
import IAtividade from "@/types/IAtividade";
import dotenv from "dotenv";

dotenv.config();

const getAtividades = async (): Promise<IAtividade[]> => {
  try {
    const response = await axiosApi.get(`/atividades`);
    return response.data;
  } catch (error) {
    console.error("Erro ao pegar atividades", error);
    throw new Error("Falha ao pegar atividades");
  }
};

const updateAtividade = async (
  id: string,
  inicioAtividade?: string,
  fimAtividade?: string,
  name?: string,
  isPommodoro?: boolean,
  cor?: string,
  concluida?: boolean,
  momentoConclusao?: string | null,
  id_categoria?: string
): Promise<IAtividade> => {
  try {
    const response = await axiosApi.patch(`/atividades/${id}`, {
      inicioAtividade: inicioAtividade ? inicioAtividade : undefined,
      fimAtividade: fimAtividade ? fimAtividade : undefined,
      name: name ? name : undefined,
      isPommodoro: isPommodoro ? isPommodoro : undefined,
      cor: cor ? cor : undefined,
      concluida: concluida ? concluida : undefined,
      momentoConclusao: momentoConclusao ? momentoConclusao : undefined,
      id_categoria: id_categoria ? id_categoria : undefined,
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar atividades", error);
    throw new Error("Falha ao atualizar atividades");
  }
};

export { getAtividades, updateAtividade };
