import ProductFile, { TProductFile } from './ProductFile';
import {
  Column,
  DataType,
  HasMany,
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
  id!: string

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

  @HasMany(() => ProductFile, {
    onDelete: 'cascade',
    hooks: true
  })
  _files!: ProductFile[];

  get files(): ProductFile[] {
    if (!this._files) {
      this._files = [];
    }

    return this._files;
  }

  addFile(file: ProductFile) {
    if (file.type === 'image') {
      this._files = this.files.filter(file => file.type !== 'image');
    }

    this.files.push(file);
  }

  getFiles(type?: TProductFile): ProductFile[] {
    if (type) {
      return this.files.filter(file => file.type === type);
    }

    return this.files;
  }

  getImageFile(): ProductFile | null {
    const files = this.getFiles('image')

    return files.length ? files[0] : null;
  }
}
