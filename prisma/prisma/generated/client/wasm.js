
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  primeiro_nome: 'primeiro_nome',
  segundo_nome: 'segundo_nome',
  password: 'password',
  genero: 'genero',
  bilhete: 'bilhete',
  telemovel: 'telemovel',
  email: 'email',
  estado: 'estado'
};

exports.Prisma.EmpregoScalarFieldEnum = {
  id: 'id',
  data_inicio: 'data_inicio',
  sector: 'sector',
  cargo: 'cargo',
  area: 'area',
  estado: 'estado',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ResidenciaScalarFieldEnum = {
  id: 'id',
  tipo: 'tipo',
  data_inicio: 'data_inicio',
  estado: 'estado',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PapelScalarFieldEnum = {
  id: 'id',
  perfil: 'perfil',
  user_id: 'user_id',
  estado: 'estado',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PessoaScalarFieldEnum = {
  id: 'id',
  estado_civil: 'estado_civil',
  provincia: 'provincia',
  municipio: 'municipio',
  profissao: 'profissao',
  estado: 'estado',
  nivel_instrucao: 'nivel_instrucao',
  data_nascimento: 'data_nascimento',
  user_id: 'user_id',
  emprego_id: 'emprego_id',
  residencia_id: 'residencia_id'
};

exports.Prisma.ContaScalarFieldEnum = {
  id: 'id',
  nome: 'nome',
  salario: 'salario',
  iban: 'iban',
  estado: 'estado',
  pessoa_id: 'pessoa_id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ConjugueScalarFieldEnum = {
  id: 'id',
  nome_completo: 'nome_completo',
  dependentes: 'dependentes',
  nivel_instrucao: 'nivel_instrucao',
  estado: 'estado',
  data_nascimento: 'data_nascimento',
  pessoa_id: 'pessoa_id'
};

exports.Prisma.DocumentoScalarFieldEnum = {
  id: 'id',
  tipo: 'tipo',
  titulo: 'titulo',
  extensao: 'extensao',
  tamanho: 'tamanho',
  nome_original: 'nome_original',
  nome_salvado: 'nome_salvado',
  estado: 'estado',
  user_id: 'user_id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DevedorScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  solicitacao: 'solicitacao',
  adimplencia: 'adimplencia',
  inadimplencia: 'inadimplencia',
  estado: 'estado',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InvestidorScalarFieldEnum = {
  id: 'id',
  maior_risco: 'maior_risco',
  maior_seguranca: 'maior_seguranca',
  saque_antecipado: 'saque_antecipado',
  fundo_protegido: 'fundo_protegido',
  estado: 'estado',
  partilhar_emprestimo: 'partilhar_emprestimo',
  user_id: 'user_id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ReclamacaoScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  estado: 'estado',
  assunto: 'assunto',
  conteudo: 'conteudo',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProponenteScalarFieldEnum = {
  id: 'id',
  solicitacao: 'solicitacao',
  reembolsar: 'reembolsar',
  satisfeitos: 'satisfeitos',
  insatisfeitos: 'insatisfeitos',
  estado: 'estado',
  user_id: 'user_id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SolidarioScalarFieldEnum = {
  id: 'id',
  tipo: 'tipo',
  parentesco: 'parentesco',
  taxa: 'taxa',
  estado: 'estado',
  pessoa_id: 'pessoa_id',
  user_id: 'user_id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MovelScalarFieldEnum = {
  id: 'id',
  modelo: 'modelo',
  matricula: 'matricula',
  detalhes: 'detalhes',
  devedor_id: 'devedor_id',
  estado: 'estado',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CreditoScalarFieldEnum = {
  id: 'id',
  tipo: 'tipo',
  valor: 'valor',
  prestacao: 'prestacao',
  juro: 'juro',
  termino: 'termino',
  estado: 'estado',
  pendencia: 'pendencia',
  progresso: 'progresso',
  devedor_id: 'devedor_id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EmprestimoScalarFieldEnum = {
  id: 'id',
  valor: 'valor',
  juro_proponente: 'juro_proponente',
  taxa_investidor: 'taxa_investidor',
  prestacao: 'prestacao',
  termino: 'termino',
  estado: 'estado',
  pendencia: 'pendencia',
  progresso: 'progresso',
  proponente_id: 'proponente_id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EmprestimoSolidarioScalarFieldEnum = {
  estado: 'estado',
  solidario_id: 'solidario_id',
  emprestimo_id: 'emprestimo_id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CreditoSolidarioScalarFieldEnum = {
  estado: 'estado',
  solidario_id: 'solidario_id',
  credito_id: 'credito_id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DiversificacaoScalarFieldEnum = {
  estado: 'estado',
  investidor_id: 'investidor_id',
  emprestimo_id: 'emprestimo_id',
  taxa: 'taxa',
  protencao: 'protencao',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SaqueScalarFieldEnum = {
  id: 'id',
  valor: 'valor',
  taxa: 'taxa',
  estado: 'estado',
  pendencia: 'pendencia',
  user_id: 'user_id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DepositoScalarFieldEnum = {
  id: 'id',
  valor: 'valor',
  estado: 'estado',
  pendencia: 'pendencia',
  user_id: 'user_id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CarteiraScalarFieldEnum = {
  id: 'id',
  saldo: 'saldo',
  estado: 'estado',
  numero: 'numero',
  codigo: 'codigo',
  user_id: 'user_id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PagamentoScalarFieldEnum = {
  id: 'id',
  valor: 'valor',
  detalhe: 'detalhe',
  prestacao: 'prestacao',
  estado: 'estado',
  pendencia: 'pendencia',
  devedor_id: 'devedor_id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ReembolsoScalarFieldEnum = {
  id: 'id',
  valor: 'valor',
  prestacao: 'prestacao',
  estado: 'estado',
  detalhe: 'detalhe',
  proponente_id: 'proponente_id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.UserOrderByRelevanceFieldEnum = {
  primeiro_nome: 'primeiro_nome',
  segundo_nome: 'segundo_nome',
  password: 'password',
  bilhete: 'bilhete',
  telemovel: 'telemovel',
  email: 'email'
};

exports.Prisma.EmpregoOrderByRelevanceFieldEnum = {
  cargo: 'cargo'
};

exports.Prisma.PessoaOrderByRelevanceFieldEnum = {
  provincia: 'provincia',
  municipio: 'municipio',
  profissao: 'profissao',
  nivel_instrucao: 'nivel_instrucao'
};

exports.Prisma.ContaOrderByRelevanceFieldEnum = {
  nome: 'nome',
  iban: 'iban'
};

exports.Prisma.ConjugueOrderByRelevanceFieldEnum = {
  nome_completo: 'nome_completo',
  nivel_instrucao: 'nivel_instrucao'
};

exports.Prisma.DocumentoOrderByRelevanceFieldEnum = {
  titulo: 'titulo',
  extensao: 'extensao',
  tamanho: 'tamanho',
  nome_original: 'nome_original',
  nome_salvado: 'nome_salvado'
};

exports.Prisma.ReclamacaoOrderByRelevanceFieldEnum = {
  assunto: 'assunto',
  conteudo: 'conteudo'
};

exports.Prisma.MovelOrderByRelevanceFieldEnum = {
  matricula: 'matricula',
  detalhes: 'detalhes'
};

exports.Prisma.PagamentoOrderByRelevanceFieldEnum = {
  detalhe: 'detalhe'
};

exports.Prisma.ReembolsoOrderByRelevanceFieldEnum = {
  detalhe: 'detalhe'
};
exports.Genero = exports.$Enums.Genero = {
  MASCULINO: 'MASCULINO',
  FEMININO: 'FEMININO'
};

exports.Sector = exports.$Enums.Sector = {
  PUBLICO: 'PUBLICO',
  PRIVADO: 'PRIVADO'
};

exports.Area = exports.$Enums.Area = {
  ADMINISTRACAO_PUBLICA: 'ADMINISTRACAO_PUBLICA',
  EDUCACAO: 'EDUCACAO',
  SAUDE: 'SAUDE',
  DEFESA_SEGURANCA: 'DEFESA_SEGURANCA',
  ENERGIA: 'ENERGIA',
  PETROLEO: 'PETROLEO',
  MINERACAO: 'MINERACAO',
  FINANCAS: 'FINANCAS',
  CONSTRUCAO: 'CONSTRUCAO',
  TECNOLOGIA: 'TECNOLOGIA',
  COMERCIO: 'COMERCIO',
  AGRICULTURA: 'AGRICULTURA',
  TURISMO: 'TURISMO'
};

exports.Propriedade = exports.$Enums.Propriedade = {
  PROPRIA: 'PROPRIA',
  RENDA: 'RENDA'
};

exports.Perfil = exports.$Enums.Perfil = {
  ADMIN: 'ADMIN',
  ANALISTA: 'ANALISTA'
};

exports.Estado = exports.$Enums.Estado = {
  SOLTEIRO: 'SOLTEIRO',
  CASADO: 'CASADO'
};

exports.Comprovativo = exports.$Enums.Comprovativo = {
  BILHETE: 'BILHETE',
  DECLARACAO_TRABALHO: 'DECLARACAO_TRABALHO',
  DECLARACAO_SEGURO: 'DECLARACAO_SEGURO',
  BEM_MOVEL: 'BEM_MOVEL',
  ORDEM_DEBITO: 'ORDEM_DEBITO',
  DEPOSITO: 'DEPOSITO',
  LEVANTAMENTO: 'LEVANTAMENTO',
  RECIBO: 'RECIBO'
};

exports.Aval = exports.$Enums.Aval = {
  CREDITO: 'CREDITO',
  EMPRESTIMO: 'EMPRESTIMO'
};

exports.Parentesco = exports.$Enums.Parentesco = {
  PAI: 'PAI',
  MAE: 'MAE',
  FILHO: 'FILHO',
  FILHA: 'FILHA',
  AVO: 'AVO',
  NETO: 'NETO',
  NETA: 'NETA',
  IRMAO: 'IRMAO',
  IRMA: 'IRMA',
  TIO: 'TIO',
  TIA: 'TIA',
  SOBRINHO: 'SOBRINHO',
  SOBRINHA: 'SOBRINHA',
  PRIMO: 'PRIMO',
  PRIMA: 'PRIMA',
  CUNHADO: 'CUNHADO',
  CUNHADA: 'CUNHADA',
  SOGRO: 'SOGRO',
  SOGRA: 'SOGRA',
  GENRO: 'GENRO',
  NORA: 'NORA',
  ENTEADO: 'ENTEADO',
  ENTEADA: 'ENTEADA',
  PADRASTO: 'PADRASTO',
  MADRASTA: 'MADRASTA'
};

exports.Modelo = exports.$Enums.Modelo = {
  CARRO: 'CARRO',
  MOTO: 'MOTO'
};

exports.Produto = exports.$Enums.Produto = {
  CONSUMO: 'CONSUMO',
  DECIMA: 'DECIMA',
  VIGESSIMA: 'VIGESSIMA',
  MENSAL: 'MENSAL'
};

exports.Progresso = exports.$Enums.Progresso = {
  PENDENTE: 'PENDENTE',
  CONCLUIDO: 'CONCLUIDO',
  CANCELADO: 'CANCELADO'
};

exports.Prisma.ModelName = {
  User: 'User',
  Emprego: 'Emprego',
  Residencia: 'Residencia',
  Papel: 'Papel',
  Pessoa: 'Pessoa',
  Conta: 'Conta',
  Conjugue: 'Conjugue',
  Documento: 'Documento',
  Devedor: 'Devedor',
  Investidor: 'Investidor',
  Reclamacao: 'Reclamacao',
  Proponente: 'Proponente',
  Solidario: 'Solidario',
  Movel: 'Movel',
  Credito: 'Credito',
  Emprestimo: 'Emprestimo',
  EmprestimoSolidario: 'EmprestimoSolidario',
  CreditoSolidario: 'CreditoSolidario',
  Diversificacao: 'Diversificacao',
  Saque: 'Saque',
  Deposito: 'Deposito',
  Carteira: 'Carteira',
  Pagamento: 'Pagamento',
  Reembolso: 'Reembolso'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
