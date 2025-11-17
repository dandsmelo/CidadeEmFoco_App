export interface DenunciaData {
     _id?: string;
    titulo: string;
    data: Date;
    status: string;
    descricao: string;
    categoria: string;
    local: string;
    usuarioId: string;
    imagem?: string;
    latitude?: number;
    longitude?: number;
}

export interface DenunciaCount {
total: number,
  porStatus: {
    pendente: number,
    em_analise: number,
    em_andamento: number,
    resolvida: number,
    rejeitada: number,
  }
}

export interface ResumoGeral {
  totalDenuncias: number;
  categoriaMaisComum: {
    categoria: string | null;
    total: number;
  };
  resolvidas: number;
}
