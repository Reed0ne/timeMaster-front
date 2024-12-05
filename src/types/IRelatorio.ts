interface EstruturaRelatorio {
  atividadesConcluidas: number;
  atividadesConcluidasAntes: number;
  atividadesNaoConcluidas: number;
  atividadesPommodoro: number;
}

export default interface IRelatorio {
  semanaAtual: EstruturaRelatorio;
  semanaPassada: EstruturaRelatorio;
}
