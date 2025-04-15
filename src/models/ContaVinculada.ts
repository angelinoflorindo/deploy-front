// models/CreditoSolidario.ts
import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({ tableName: 'conta_vinculadas' })
export default class CreditoSolidario extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.INTEGER)
  proponente_id!: number;

  @Column(DataType.INTEGER)
  emprestimo_id!: number;

  @Column(DataType.INTEGER)
  valor_retido!: number;

  @Column(DataType.DATE)
  data_desbloqueio!: Date;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  estado!: boolean;
}
