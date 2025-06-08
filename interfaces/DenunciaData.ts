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
}