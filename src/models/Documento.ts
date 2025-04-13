// models/Documento.ts
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import User from './User';

export enum DocumentoTipo {
  BILHETE = 'BILHETE',
  DECLARACAO_TRABALHO = 'DECLARACAO_TRABALHO',
  DECLARACAO_SEGURO = 'DECLARACAO_SEGURO',
  BEM_MOVEL = 'BEM_MOVEL ',
  ORDEM_DEBITO = 'ORDEM_DEBITO ',
  DEPOSITO = 'DEPOSITO',
  LEVANTAMENTO = 'LEVANTAMENTO ',
  RECIBO = 'RECIBO',
}

@Table({ tableName: 'documentos' })
export default class Documento extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({
    type: DataType.ENUM(...Object.values(DocumentoTipo)),
    allowNull: false,
  })
  tipo!: DocumentoTipo;

  @Column(DataType.STRING)
  titulo!: string;

  @Column(DataType.STRING)
  extensao!: string;

  @Column(DataType.STRING)
  tamanho!: string;

  @Column(DataType.STRING)
  nome_original!: string;

  @Column(DataType.STRING)
  nome_salvado!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  estado!: boolean;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id!: number;
}
