export default interface IAtividade {
  _id: string;
  name: string;
  isPommodoro: boolean;
  cor: string;
  concluida: boolean;
  momentoConclusao: string | null;
  inicioAtividade: string;
  fimAtividade: string;
  id_categoria: string;
}
