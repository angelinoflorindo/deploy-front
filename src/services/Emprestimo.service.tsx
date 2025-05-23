import { EmprestimoProps, InvestidorProps } from "./user.service";



export interface EmprestimoNegociar{
   id: any;
        valor: any;
        estado: any;
        juro: any;
        prestacao: any;
        prazo: any;
        progresso: any;
        proponente_id: any;
        pendencia: any;
        user_id: any;
        createdAt: any;
        updatedAt: any;
        NegocearEmprestimos: NegocearEmprestimoDef[]
}

export interface NegocearEmprestimoDef{
        id:any,
        createdAt: any;
        updatedAt: any;
        Investidor:InvestidorProps,
        Emprestimo:EmprestimoProps
}

export interface EmprestimoValidado {
  id: any;
  email: any;
  primeiro_nome: any;
  segundo_nome: any;
  bilhete: any;
  Proponente: {
    id: any;
    estado: any;
    user_id: any;
    createdAt: any;
    updatedAt: any;
    Emprestimos: [
      {
        id: any;
        valor: any;
        estado: any;
        juro: any;
        prestacao: any;
        prazo: any;
        progresso: any;
        proponente_id: any;
        pendencia: any;
        user_id: any;
        createdAt: any;
        updatedAt: any;
        Diversificacaos: DiversificacaoProps[]
      }
    ];
  };
}

export interface DiversificacaoProps {
  investidor_id: number;
  emprestimo_id: number;
  estado: any;
  protencao: any;
  taxa: any;
  createdAt: any;
  updatedAt: any;
  Emprestimos:EmprestimoProps
}

export interface ReembolsoProps {
  id: number;
  valor: any;
  estado: any;
  prestacao: any;
  detalhe: any;
  proponente_id:any;
  createdAt: any;
  updatedAt: any;
}


