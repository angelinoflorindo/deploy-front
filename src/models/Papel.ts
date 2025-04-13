// models/Papel.ts
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

@Table({ tableName: 'papel' })
export default class Papel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({
    type: DataType.ENUM('ADMIN', 'ANALISTA'),
    allowNull: false,
  })
  perfil!: 'ADMIN' | 'ANALISTA';

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  estado!: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id!: number;
}
