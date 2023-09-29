import db from '../../db/sequelize'

type Product = typeof db.sequelize.model.Product

export class ProductRepository {
    async findAll(): Promise<Product> {
        
    }
}