// models/Emprestimo.ts
import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
} from 'sequelize-typescript';
import Proponente from './Proponente';

export enum ProgressoEmprestimo {
  PENDENTE = 'PENDENTE',
  CONCLUIDO = 'CONCLUIDO',
  CANCELADO = 'CANCELADO',
}

@Table({ tableName: 'emprestimos' })
export default class Emprestimo extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  valor!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  juro_proponente!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  taxa_investidor!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  prestacao!: number;

  @Column({ type: DataType.DATE, allowNull: false })
  termino!: Date;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  estado!: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  pendencia!: boolean;

  @Column({
    type: DataType.ENUM(...Object.values(ProgressoEmprestimo)),
    allowNull: false,
  })
  progresso!: ProgressoEmprestimo;

  @ForeignKey(() => Proponente)
  @Column({ type: DataType.INTEGER, allowNull: false })
  proponente_id!: number;
}
