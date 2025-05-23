import { DiversificacaoProps, EmprestimoNegociar } from "./Emprestimo.service";

export interface UserInfo {
  id: any;
  primeiro_nome: any;
  segundo_nome: any;
  password: any;
  genero: any;
  bilhete: any;
  telemovel: any;
  email: any;
  Documentos: DocumentoProps;
  Pessoa: PessoaDef;
  Investidor: InvestidorProps;
  Devedor: DevedorProps;
  Depositos: DepositoProps;
  Reclamacaos: ReclamacaoProps;
  Saque: SaqueProps;
  Carteira: CarteiraProps;
  Proponente: ProponenteProps;
  Papel: {
    id: any;
    perfil: any;
  };
}

export interface PerfilInfo {
  id: any;
  estado: any;
  perfil: any;
  user_id: any;
  createdAt: any;
  updatedAt: any;
}
export interface PerfilProps {
  user: UserInfo;
  papel: PerfilInfo;
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
  id: any;
  nome: any;
  iban: any;
  salario: any;
  emprego_id: any;
  pessoa_id: any;
  createdAt: any;
  updatedAt: any;
}

export interface InvestidorProps {
  id: any;
  maior_risco: boolean;
  maior_seguranca: boolean;
  saque_antecipado: boolean;
  fundo_protegido: boolean;
  partilhar_emprestimo: boolean;
  estado: boolean;
  user_id: any;
  createdAt: any;
  updatedAt: any;
  User: UserProps;
  Diversificacaos: DiversificacaoProps[];
}

export interface InvestidorSimps {
  id: any;
  maior_risco: boolean;
  maior_seguranca: boolean;
  saque_antecipado: boolean;
  fundo_protegido: boolean;
  partilhar_emprestimo: boolean;
  estado: boolean;
  user_id: any;
  createdAt: any;
  updatedAt: any;
}

export interface ProponenteProps {
  id: any;
  solicitacao: any;
  reembolsar: any;
  satisfeitos: any;
  insatisfeitos: any;
  estado: boolean;
  user_id: any;
  createdAt: any;
  updatedAt: any;
  User: UserProps;
  Emprestimos: any[];
}

export interface DepositoProps {
  id: any;
  valor: any;
  user_id: any;
  pendencia: any;
  estado: any;
  createdAt: any;
  updatedAt: any;
}

export interface SaqueProps {
  id: any;
  taxa: any;
  valor: any;
  estado: any;
  pendencia: any;
  user_id: any;
  createdAt: any;
  updatedAt: any;
}

export interface EmprestimoProps {
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
  Proponente: ProponenteProps;
}

export interface EmprestimoDef {
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
  totalGuardiaos: any;
  totalTaxa: string;
  taxaDiversificada: any;
  EmprestimoSolidarios: any[];
  Diversificacaos: any[];
  Proponente: {
    id: any;
    User: UserProps;
    ContaVinculadas: ContaVinculadaProps[];
  };
}
export interface CarteiraProps {
  id: any;
  codigo: any;
  numero: any;
  saldo: any;
  user_id: any;
  createdAt: any;
  updatedAt: any;
}

export interface ReclamacaoProps {
  id: any;
  assunto: any;
  conteudo: any;
  user_id: any;
  createdAt: any;
  updatedAt: any;
}

export interface DocumentoProps {
  id: any;
  tipo: any;
  titulo: any;
  nome_salvado: any;
  nome_original: any;
  extensao: any;
  user_id: any;
  createdAt: any;
  updatedAt: any;
  User: UserProps;
}

export interface NegociarEmprestimoProps {
  emprestimo_id: any;
  investidor_id: any;
  valor: any;
  juro: any;
  prestacao: any;
  prazo: any;
  pendencia: any;
  estado: any;
  Investidor: {
    id: any;
    user_id: any;
    User: {
      id: any;
      primeiro_nome: any;
      segundo_nome: any;
    };
  };
  extensao: any;
  user_id: any;
  createdAt: any;
  updatedAt: any;
}

export interface NegociarEmprestimoDef{
  id:any,
  primeiro_nome:any,
  segundo_nome:any,
  Proponente:{
    id:any,
    Emprestimos:EmprestimoNegociar[]
  }
}

export interface ContaVinculadaProps {
  id: any;
  valor_retido: any;
  estado: any;
  proponente_id: any;
  created_at: any;
  updated_at: any;
}

export interface DevedorProps {
  id: any;
  solicitacao: any;
  adimplencia: any;
  inadimplencia: any;
  estado: boolean;
  user_id: any;
  createdAt: any;
  updatedAt: any;
}

export interface SolidarioFace {
  id: any;
  tipo: any;
  parentesco: any;
  taxa: any;
  pessoa_id: any;
  user_id: any;
  createdAt: any;
  updatedAt: any;
  User: {
    id: any;
    primeiro_nome: any;
    segundo_nome: any;
    email: any;
    Investidor: InvestidorSimps;
    Pessoa: PessoaProps;
  };
}

export interface SolidarioProps {
  id: any;
  tipo: any;
  parentesco: any;
  taxa: any;
  pessoa_id: any;
  user_id: any;
  createdAt: any;
  updatedAt: any;
  Pessoa: {
    User: UserProps;
  };
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
  Conjugue: ConjugueProps;
  Emprego: EmpregoProps;
  Residencia: ResidenciaProps;
  Conta: ContaProps;
  User: { id: any; email: any };
}

export interface Guardiao {
  id: any;
  primeiro_nome: any;
  segundo_nome: any;
  telemovel: any;
  email: any;
  user_id: any;
  Pessoa: { id: any };
}
