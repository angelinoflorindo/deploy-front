// models/Reclamacao.ts
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

@Table({ tableName: 'reclamacoes' })
export default class Reclamacao extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id!: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  estado!: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  assunto!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  conteudo!: string;
}
