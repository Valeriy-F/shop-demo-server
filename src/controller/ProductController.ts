import { Controller, HttpCode } from './Controller'
import FilesUploadException from '../exception/FilesUploadException'
import ImmutablePropertyException from '../exception/ImmutablePropertyException'
import MissedRequiredPropertiesException from '../exception/MissedRequiredPropertiesException'
import NotFoundException from '../exception/NotFoundException'
import RestException from '../exception/RestException'
import Product from '../model/Product'
import ProductFile from '../model/ProductFile'
import ProductFileRepository from '../repository/ProductFileRepository'
import ProductRepository from '../repository/ProductRepository'
import { Product as RestProduct, ProductResponse as RestProductResponse } from '../rest-model/product-model'
import ProductFilesService from '../service/ProductFilesService'
import ProductFilesUploaderProvider from '../service/ProductFilesUploaderProvider'
import { Request, Response } from 'express'
import { MulterError } from 'multer'

class ProductController extends Controller {
    private readonly productFilesService: ProductFilesService;
    private readonly productFilesUploaderProvider: ProductFilesUploaderProvider

    constructor() {
        super()

        this.productFilesService = new ProductFilesService();
        this.productFilesUploaderProvider = new ProductFilesUploaderProvider();

        this.getAll = this.getAll.bind(this)
        this.getByName = this.getByName.bind(this)
        this.post = this.post.bind(this)
        this.put = this.put.bind(this)
        this.patchImage = this.patchImage.bind(this)
        this.delete = this.delete.bind(this)
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const products = await ProductRepository.findAll()
            const restProducts = [];

            for (const product of products) {
                restProducts.push(await this.modelToRestResponseModel(product, new RestProductResponse()))
            }

            this.handleResponse<RestProduct[]>(res, HttpCode.Ok, restProducts)
        } catch (error: any) {
            this.handleErrorResponse(res, error);
        }
    }

    async getByName(req: Request, res: Response): Promise<void> {
        try {
            const product = await this.getProductByRequest(req);

            this.handleResponse<RestProduct>(res, HttpCode.Ok, await this.modelToRestResponseModel(product, new RestProductResponse()))
        } catch (error: any) {
            this.handleErrorResponse(res, error)
        }
    }

    async post(req: Request, res: Response): Promise<void> {
        try {
            this.validateRequiredProperties(req.body)

            const product = new Product()

            await ProductRepository.save(this.restModelToModel(req.body as RestProduct, product))

            this.handleResponse<RestProduct>(res, HttpCode.Created, await this.modelToRestResponseModel(product, new RestProductResponse()))
        } catch (error: any) {
            this.handleErrorResponse(res, error)
        }
    }

    async put(req: Request, res: Response): Promise<void> {
        const productData = req.body;

        try {
            this.validateRequiredProperties(productData);

            const product = await this.getProductByRequest(req);
            const productName = product.name;

            this.restModelToModel(productData as RestProduct, product);

            if (product.name !== productName) {
                throw new ImmutablePropertyException("name");
            }

            await ProductRepository.save(product);

            this.handleResponse<RestProduct>(res, HttpCode.Ok, await this.modelToRestResponseModel(product, new RestProductResponse()));
        } catch (error: any) {
            this.handleErrorResponse(res, error);
        }
    }

    async patchImage(req: Request, res: Response) {
        const _this = this;
        const product = await this.getProductByRequest(req);
        const upload = await this.productFilesUploaderProvider.getProductImageUploader(product);

        upload(req, res, async function (err) {
            try {
                _this.handleFileUploadError(err)
            } catch (error: any) {
                _this.handleErrorResponse(res, error);

                return;
            }

            const file = req.file;

            if (file) {
                const prevImageFile = product.getImageFile();

                if (prevImageFile) {
                    try {
                        await _this.productFilesService.deleteProductImageFile(product);
                    } catch (error: any) {
                        console.error(`Failed to delete from storage previous image file "${prevImageFile.name}".`);
                    }

                    try {
                        await ProductFileRepository.delete(prevImageFile);
                    } catch (error: any) {
                        console.error(`Failed to delete from DB previous image file "${prevImageFile.name}".`);
                    }
                }

                const productFile = ProductFile.createImage(file.filename, product);

                try {
                    await ProductFileRepository.save(productFile);
                } catch (error: any) {
                    _this.productFilesService.deleteProductImageFile(product);
                    _this.handleErrorResponse(res, error);

                    return;
                }
            }

            _this.handleResponse<RestProduct>(
                res,
                HttpCode.Ok,
                await _this.modelToRestResponseModel(product, new RestProductResponse())
            );
        })
    }

    async delete(req: Request, res: Response): Promise<void> {
        let product;

        try {
            product = await this.getProductByRequest(req);

            await ProductRepository.delete(product);
        } catch (error: any) {
            this.handleErrorResponse(res, error);

            return;
        }

        try {
            await this.productFilesService.deleteProductFilesDir(product);
        } catch (error) {
            console.error(`Failed to delete files directory for product "${product.name}".`)
        }


        this.handleResponse<string>(res, HttpCode.Ok, `Successfully deleted product "${product.name}"`);
    }

    private handleFileUploadError(error: any, fileName = 'unknown file') {
        if (error instanceof MulterError) {
            throw new FilesUploadException(`Failed to upload file "${fileName}". ${error.message}`);
        } else if (error) {
            throw new RestException(error.message);
        }
    }

    private restModelToModel(restModel: RestProduct, model: Product): Product {
        model.name = restModel.name
        model.displayName = restModel.displayName
        model.price = restModel.price
        model.description = restModel.description

        return model
    }

    private async modelToRestResponseModel(model: Product, restModel: RestProductResponse): Promise<RestProductResponse> {
        restModel.name = model.name
        restModel.displayName = model.displayName
        restModel.price = model.price
        restModel.description = model.description
        restModel.files.image = new URL(await this.productFilesService.getProductImageFileURL(model)).toString()

        return restModel
    }

    private validateRequiredProperties(validatableObject: any): void {
        const requiredProperties: string[] = [
            "name",
            "displayName",
            "price",
        ]
        const missedProperties: string[] = requiredProperties.filter(property => (validatableObject[property] === undefined))

        if (missedProperties.length > 0) {
            throw new MissedRequiredPropertiesException(requiredProperties, missedProperties)
        }
    }

    private async getProductByRequest(req: Request): Promise<Product> {
        const productName = req.params["name"];
        const product = await ProductRepository.findOneByName(productName);

        if (!product) {
            throw new NotFoundException(`Product "${productName}" is not found`);
        }

        return product;
    }
}

export default new ProductController()
