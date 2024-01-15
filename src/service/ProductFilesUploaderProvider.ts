import ProductFilesService from './ProductFilesService';
import Product from '../model/Product';
import { createDirIfNotExists } from '../utils/file-service';
import { RequestHandler } from 'express';
import multer from 'multer';
import path from 'path';

export default class ProductFilesUploaderProvider {
    private readonly productFilesService: ProductFilesService;

    constructor() {
        this.productFilesService = new ProductFilesService();
    }

    async getProductImageUploader(product: Product): Promise<RequestHandler> {
        const destinationDir = await createDirIfNotExists(
            this.productFilesService.getProductFilesDir(product)
        );

        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, destinationDir);
            },
            filename: function (req, file, cb) {
                const ext = path.extname(file.originalname);

                cb(null, `image-${new Date().getTime()}${ext}`);
            }
        })

        return multer({ storage }).single('image');
    }
}
