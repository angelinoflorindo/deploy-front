// models/Pagamento.ts
import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
} from 'sequelize-typescript';
import Devedor from './Devedor';

@Table({ tableName: 'pagamentos' })
export default class Pagamento extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  valor!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  detalhe!: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  prestacao!: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  estado!: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  pendencia!: boolean;

  @ForeignKey(() => Devedor)
  @Column({ type: DataType.INTEGER, allowNull: false })
  devedor_id!: number;
}
