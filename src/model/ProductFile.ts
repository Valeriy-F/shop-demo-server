import Product from './Product';
import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table
    } from 'sequelize-typescript';

type TProductFile = 'image';

@Table({
    tableName: 'product-files',
    timestamps: false
})
export default class ProductFile extends Model {
    @Column({
        field: 'id',
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false
    })
    id!: string;

    @Column({
        field: 'name',
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;

    @Column({
        field: 'type',
        type: DataType.STRING,
        allowNull: false
    })
    type!: TProductFile;

    @ForeignKey(() => Product)
    @Column({
        field: 'productId',
        type: DataType.UUID
    })
    productId!: string;

    @BelongsTo(() => Product)
    _product!: Product;

    static createImage(name: string, product: Product): ProductFile {
        const productFile = new ProductFile();
        productFile.name = name;
        productFile.type = 'image';
        productFile.product = product;

        return productFile;
    }

    set product(product: Product) {
        this.productId = product.id;
        this._product = product
        product.addFile(this);
    }

    get product(): Product {
        return this._product;
    }
}

export { TProductFile };

