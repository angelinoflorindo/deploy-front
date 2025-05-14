// models/Solidario.ts
import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from "sequelize-typescript";
import {User} from "./User";
import {Pessoa} from "./Pessoa";

@Table({ tableName: "solidarios" })
export  class Solidario extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({
    type: DataType.ENUM("CREDITO", "EMPRESTIMO"),
    allowNull: false,
  })
  tipo!: "CREDITO" | "EMPRESTIMO";

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  parentesco!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  taxa!: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  estado!: boolean;

  @ForeignKey(() => Pessoa)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  pessoa_id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id!: number;


  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  updatedAt!: Date;
}
