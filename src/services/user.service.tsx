export interface UserInfo {
  id: number;
  primeiro_nome: any;
  segundo_nome: any;
  password: any;
  genero: any;
  bilhete: any;
  telemovel: any;
  email: any;
  documento: {
    id: number;
    tipo: any;
    titilo: any;
  };
  pessoa: {
    id: number;
    estado_civil: any;
    provincia: any;
    municipio: any;
    profissao: any;
    nivel_instrucao: any;
    data_nascimento: any;
    user_id:any,
    emprego_id:any;
    residencia_id:any;
    conjugue: {
      id: any;
      nome_completo: any;
      nivel_instrucao: any;
      dependentes: any;
      data_nascimento: any;
    };

    emprego: {
      id: number;
      data_inicio: any;
      sector: any;
      cargo: any;
      area: any;
      createdAt: any;
      updatedAt: any;
    };
    residencia: {
      id: number;
      tipo: any;
      data_inicio: any;
      createdAt: any;
      updatedAt: any;
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
  estado_civil: any;
  provincia: any;
  municipio: any;
  profissao: any;
  user_id:any;
  emprego_id:any;
  residencia_id:any;
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
