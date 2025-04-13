// models/CreditoSolidario.ts
import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({ tableName: 'creditos_solidarios' })
export default class CreditoSolidario extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.INTEGER)
  credito_id!: number;

  @Column(DataType.INTEGER)
  solidario_id!: number;
}
