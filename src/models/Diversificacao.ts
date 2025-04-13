// models/Diversificacao.ts
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
} from 'sequelize-typescript';
import Investidor from './Investidor';
import Emprestimo from './Emprestimo';

@Table({ tableName: 'diversificacaos' })
export default class Diversificacao extends Model {
  @PrimaryKey
  @ForeignKey(() => Investidor)
  @Column(DataType.INTEGER)
  investidor_id!: number;

  @PrimaryKey
  @ForeignKey(() => Emprestimo)
  @Column(DataType.INTEGER)
  emprestimo_id!: number;

  @Column(DataType.INTEGER)
  taxa!: number;

  @Column(DataType.BOOLEAN)
  protencao!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  estado!: boolean;
}
