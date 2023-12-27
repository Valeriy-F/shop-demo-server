import Product from '../model/Product'
import {
    BASE_URL,
    deleteFileOrDir,
    isExists,
    PUBLIC_DIR
    } from '../utils/file-service'
import path from 'path'

export default class ProductFilesService {
    private static readonly PRODUCT_FILES_FOLDER = 'products';
    private static readonly PRODUCT_FILES_DIR = path.join(PUBLIC_DIR, ProductFilesService.PRODUCT_FILES_FOLDER);
    private static readonly DEFUALT_PRODUCT_IMAGE_FILE = 'image-default.jpg';

    getProductFilesDir(product: Product): string {
        return path.join(ProductFilesService.PRODUCT_FILES_DIR, product.name);
    }

    async deleteProductFilesDir(product: Product) {
        await deleteFileOrDir(path.join(this.getProductFilesDir(product)));
    }

    async deleteProductImageFile(product: Product) {
        const productFile = product.getImageFile();

        if (!productFile) {
            return;
        }

        await deleteFileOrDir(path.join(this.getProductFilesDir(product), productFile.name))
    }

    async getProductImageFileURL(product: Product): Promise<string> {
        const productFile = product.getImageFile();

        let urlImagePath = ProductFilesService.DEFUALT_PRODUCT_IMAGE_FILE;

        if (productFile) {
            const storageImagePath = path.join(this.getProductFilesDir(product), productFile.name);

            if (await isExists(storageImagePath)) {
                urlImagePath = path.join(product.name, productFile.name);
            }
        }

        return path.join(BASE_URL, ProductFilesService.PRODUCT_FILES_FOLDER, urlImagePath)
    }
}
