// models/Devedor.ts
import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  HasMany,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "./User";
@Table({ tableName: "devedores" })
export class Devedor extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.INTEGER)
  solicitacao!: number;

  @Column(DataType.INTEGER)
  adimplencia!: number;

  @Column(DataType.INTEGER)
  inadimplencia!: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  estado!: boolean;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id!: number;

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  updatedAt!: Date;
}
