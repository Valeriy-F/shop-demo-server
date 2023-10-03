import Product from '../model/Product'

class ProductRepository {
    async findAll(): Promise<Product[]> {
        return await Product.findAll({ order: [['name', 'ASC']] })
    }

    async findOneByName(name: string): Promise<Product | null> {
        return await Product.findOne({where: {name}})
    }

    async save(product: Product): Promise<void> {
        await product.save()
    }

    async delete(product: Product): Promise<void> {
        await product.destroy()
    }
}

export default new ProductRepository()