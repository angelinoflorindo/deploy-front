export interface UserInfo {
  id: number;
  primeiro_nome: any;
  segundo_nome: any;
  password: any;
  genero: any;
  bilhete: any;
  telemovel: any;
  email: any;
  documento: DocumentoProps
  pessoa: PessoaDef;
  investidor:InvestidorProps,
  devedor:DevedorProps
  deposito:DepositoProps,
  reclamacao:ReclamacaoProps,
  saque:SaqueProps,
  carteira:CarteiraProps


}

export interface UserProps {
  id: any;
  primeiro_nome: any;
  segundo_nome: any;
  password: any;
  email: any;
  bilhete: any;
  telemovel: any;
  genero: any;
}

export interface PessoaProps {
  id: any;
  estado_civil: any;
  provincia: any;
  municipio: any;
  profissao: any;
  user_id: any;
  emprego_id: any;
  residencia_id: any;
  nivel_instrucao: any;
  data_nascimento: any;
}

export interface EmpregoProps {
  id: any;
  data_inicio: any;
  sector: any;
  cargo: any;
  area: any;
  createdAt: any;
  updatedAt: any;
}

export interface ConjugueProps {
  id: any;
  nome_completo: any;
  nivel_instrucao: any;
  dependentes: any;
  data_nascimento: any;
}

export interface ResidenciaProps {
  id: any;
  tipo: any;
  data_inicio: any;
  createdAt: any;
  updatedAt: any;
}

export interface ContaProps {
  id: number;
  nome: any;
  iban: any;
  salario: any;
  emprego_id: any;
  pessoa_id: any;
  createdAt: any;
  updatedAt: any;
}


export interface InvestidorProps{
  id:any;
  maior_risco:boolean;
  maior_seguranca:boolean;
  saque_antecipado:boolean,
  fundo_protegido:boolean,
  partilhar_emprestimo:boolean;
  estado:boolean;
  user_id:any;
  createdAt: any;
  updatedAt: any;
}

export interface DepositoProps{
  id:any,
  valor:any,
  user_id:any;
  createdAt: any;
  updatedAt: any;

}

export interface SaqueProps{
  id:any,
  taxa:any;
  valor:any,
  user_id:any;
  createdAt: any;
  updatedAt: any;
}

export interface CarteiraProps{
  id:any,
  codigo:any;
  numero:any,
  saldo:any;
  user_id:any;
  createdAt: any;
  updatedAt: any;
}

export interface ReclamacaoProps{
  id:any,
  assunto:any,
  conteudo:any;
  user_id:any;
  createdAt: any;
  updatedAt: any;
}

export interface DocumentoProps{
  id:any,
  tipo:any,
  titulo:any;
  user_id:any;
  createdAt: any;
  updatedAt: any;
}


export interface DevedorProps{
  id:number;
  solicitacao:any;
  adimplencia:any;
  inadimplencia:any;
  estado:boolean;
  user_id:any;
  createdAt: any;
  updatedAt: any;
}

export interface SolidarioProps{
  id: any;
  tipo: any;
  parentesco: any;
  taxa: any;
  pessoa_id: any;
  user_id:any;
  createdAt: any;
  updatedAt: any;
  pessoa:{
    user:UserProps
  }
}
// More definitions
export interface PessoaDef {
  id: any;
  estado_civil: any;
  provincia: any;
  municipio: any;
  profissao: any;
  user_id: any;
  emprego_id: any;
  residencia_id: any;
  nivel_instrucao: any;
  data_nascimento: any;
  conjugue: ConjugueProps;
  emprego: EmpregoProps;
  residencia: ResidenciaProps;
  conta: ContaProps;
}


export interface Guardiao {
  id: any;
  primeiro_nome: any;
  segundo_nome: any;
  telemovel: any;
  email: any;
  user_id:any;
  pessoa: { id: any };
}