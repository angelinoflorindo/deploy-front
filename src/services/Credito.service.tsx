import { DevedorProps, UserProps } from "./user.service";


export interface CreditoProps{
  id:any,
  valor:any,
  estado:any,
  juro:any,
  prestacao:any,
  prazo:any,
  tipo:any,
  progresso:any,
  devedor_id:any,
  pendencia:any,
  user_id:any;
  createdAt: any;
  updatedAt: any;
  Devedor:{
    id:any,
    estado:any
    User:UserProps
  }
}

export interface DebitoVinculadoProps{
  id:any,
  valor_retido:any,
  estado:any,
  devedor_id:any;
  createdAt: any;
  updatedAt: any
}




export interface CreditoDef{
  id:any,
  valor:any,
  estado:any,
  juro:any,
  prestacao:any,
  prazo:any,
  progresso:any,
  devedor_id:any,
  pendencia:any,
  user_id:any;
  createdAt: any;
  updatedAt: any;
  totalGuardiaos:number
  totalTaxa:string
  taxaDiversificada:any
  CreditoSolidarios:any[],
  Devedor:{
    id:any,
    User:UserProps,
    DebitoVinculados:DebitoVinculadoProps[]
  }
}

