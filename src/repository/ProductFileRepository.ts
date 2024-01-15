import ProductFile from '../model/ProductFile';

class ProductFileRepository {
    async save(file: ProductFile): Promise<void> {
        await file.save();
    }

    async delete(file: ProductFile): Promise<void> {
        await file.destroy();
    }
}

export default new ProductFileRepository()
