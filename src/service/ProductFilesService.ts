import Product from '../model/Product';
import {
    BASE_URL,
    deleteFileOrDir,
    isExists,
    PUBLIC_DIR
    } from '../utils/file-service';
import path from 'path';

export default class ProductFilesService {
    private static readonly PRODUCT_FILES_FOLDER = 'products';
    private static readonly PRODUCT_FILES_DIR = path.join(PUBLIC_DIR, ProductFilesService.PRODUCT_FILES_FOLDER);
    private static readonly DEFUALT_PRODUCT_IMAGE_FILE = 'image-default.jpg';
    private static readonly PRODUCT_IMAGE_FILE = 'image.jpg';

    getProductFilesDir(product: Product): string {
        return path.join(ProductFilesService.PRODUCT_FILES_DIR, product.name);
    }

    async deleteProductFileDir(product: Product) {
        await deleteFileOrDir(path.join(this.getProductFilesDir(product)));
    }

    async deleteProductImageFile(product: Product) {
        await deleteFileOrDir(path.join(this.getProductFilesDir(product), ProductFilesService.PRODUCT_IMAGE_FILE))
    }

    async getProductImageFileURL(product: Product): Promise<string> {
        const storageImagePath = path.join(this.getProductFilesDir(product), ProductFilesService.PRODUCT_IMAGE_FILE);

        const urlImagePath = await isExists(storageImagePath)
            ? path.join(product.name, ProductFilesService.PRODUCT_IMAGE_FILE)
            : ProductFilesService.DEFUALT_PRODUCT_IMAGE_FILE

        return path.join(BASE_URL, ProductFilesService.PRODUCT_FILES_FOLDER, urlImagePath)
    }
}
