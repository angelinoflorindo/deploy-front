import { DevedorProps, UserProps } from "./user.service";

export interface CreditoProps {
  id: any;
  valor: any;
  estado: any;
  juro: any;
  prestacao: any;
  prazo: any;
  tipo: any;
  progresso: any;
  devedor_id: any;
  pendencia: any;
  user_id: any;
  createdAt: any;
  updatedAt: any;
  Devedor: {
    id: any;
    estado: any;
    User: UserProps;
  };
  Credoras: CredoraProps[];
}


export interface CredoraProps{
  investidor_id: any;
  credito_id: any;
  corrente: any;
  estado: any;
  createdAt: any;
  updatedAt: any;
}

export interface DebitoVinculadoProps {
  id: any;
  valor_retido: any;
  estado: any;
  devedor_id: any;
  createdAt: any;
  updatedAt: any;
}

export interface CreditoDef {
  id: any;
  valor: any;
  estado: any;
  juro: any;
  prestacao: any;
  prazo: any;
  progresso: any;
  devedor_id: any;
  pendencia: any;
  user_id: any;
  createdAt: any;
  updatedAt: any;
  totalGuardiaos: number;
  totalTaxa: string;
  taxaDiversificada: any;
  CreditoSolidarios: any[];
  Devedor: {
    id: any;
    User: UserProps;
    DebitoVinculados: DebitoVinculadoProps[];
  };
}

export interface CreditoUserProps {
  id: number;
  email: any;
  primeiro_nome: any;
  segundo_nome: any;
  bilhete: any;
  Devedor: {
    id: number;
    estado: any;
    user_id: any;
    createdAt: any;
    updatedAt: any;
    Creditos: CreditoProps[];
  };
}

export interface PagamentosProps {
  id: number;
  valor: any;
  estado: any;
  prestacao: any;
  pendencia:any
  detalhe: any;
  devedor_id:any;
  createdAt: any;
  updatedAt: any;
}