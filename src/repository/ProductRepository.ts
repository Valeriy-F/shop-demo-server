import Product from '../model/Product';
import ProductFile from '../model/ProductFile';

class ProductRepository {
    async findAll(): Promise<Product[]> {
        return await Product.findAll({include: [ProductFile], order: [['name', 'ASC']] })
    }

    async findOneByName(name: string): Promise<Product | null> {
        return await Product.findOne({ include: [ProductFile], where: {name}})
    }

    async save(product: Product): Promise<void> {
        await product.save()
    }

    async delete(product: Product): Promise<void> {
        await product.destroy()
    }
}

export default new ProductRepository()
