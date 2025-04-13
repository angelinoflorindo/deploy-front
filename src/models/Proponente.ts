// models/Proponente.ts
import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
} from 'sequelize-typescript';
import User from './User';

@Table({ tableName: 'proponentes' })
export default class Proponente extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  solicitacao!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  reembolsar!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  satisfeitos!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  insatisfeitos!: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  estado!: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  user_id!: number;
}
