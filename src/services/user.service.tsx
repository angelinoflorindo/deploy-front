export interface UserInfo {
  id: number;
  primeiro_nome: any;
  segundo_nome: any;
  password: String;
  genero: any;
  bilhete: any;
  telemovel: any;
  email: any;
  documento: {
    id: number;
    tipo: String;
    titilo: String;
  };
  pessoa: {
    id: number;
    estado_civil: String;
    provincia: String;
    municipio: String;
    profissao: String;
    nivel_instrucao: String;
    data_nascimento: String;
    conjugue: {
      id: any;
      nome_completo: String;
      nivel_instrucao: String;
      dependentes: any;
      data_nascimento: String;
    };

    emprego: {
      id: number;
      data_inicio: String;
      sector: String;
      cargo: String;
      area: String;
      createdAt: String;
      upStringdAt: String;
    };
    residencia: {
      id: number;
      tipo: String;
      data_inicio: String;
      createdAt: String;
      upStringdAt: String;
    };
  };
}

export interface UserProps {
  id:any,
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
  estado_civil: String;
  provincia: String;
  municipio: String;
  profissao: String;
  nivel_instrucao: String;
  data_nascimento: String;
}

export interface EmpregoProps {
  id: number;
  data_inicio: String;
  sector: String;
  cargo: String;
  area: String;
  createdAt: String;
  upStringdAt: String;
}

export interface ConjugueProps {
  id: any;
  nome_completo: String;
  nivel_instrucao: String;
  dependentes: any;
  data_nascimento: String;
}

export interface ResidenciaProps {
  id: number;
  tipo: String;
  data_inicio: String;
  createdAt: String;
  upStringdAt: String;
}
