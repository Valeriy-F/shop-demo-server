import {
  Column,
  DataType,
  Is,
  IsFloat,
  Length,
  Model,
  Table
  } from 'sequelize-typescript';

@Table({
  tableName: 'products',
  timestamps: false
})
export default class Product extends Model {
  @Column({
    field: 'id',
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false
  })
  id!: number

  @Length({ min: 3 })
  @Is('ValidUnderscore', value => {
    if (!new RegExp('^(([a-z])([_\d])*?)+').test(value)) {
      throw new Error(`Value "${value}" is required to be a valid underscore string`)
    }
  })
  @Column({
    field: 'name',
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  name!: string

  @Length({ min: 3 })
  @Column({
    field: 'display_name',
    type: DataType.STRING,
    allowNull: false
  })
  displayName!: string

  @IsFloat
  @Column({
    field: 'price',
    type: DataType.FLOAT,
    allowNull: false
  })
  price!: number

  @Column({
    field: 'description',
    type: DataType.TEXT
  })
  description?: string
}
