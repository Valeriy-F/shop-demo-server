import FilesUploadException from '../exception/FilesUploadException'
import ImmutablePropertyException from '../exception/ImmutablePropertyException'
import MissedRequiredPropertiesException from '../exception/MissedRequiredPropertiesException'
import NotFoundException from '../exception/NotFoundException'
import RestException from '../exception/RestException'
import { Response } from 'express'
import path from 'path'
import { ValidationError, ValidationErrorItem } from 'sequelize'

export class Controller {
    protected static readonly PUBLIC_DIR = 'public';
    protected static readonly PUBLIC_IMAGES_DIR = path.join(Controller.PUBLIC_DIR, 'images');

    public handleErrorResponse(res: Response, error: Error): void {
        let responseInfo: ResponseInfo<null>

        if (error instanceof ImmutablePropertyException) {
            responseInfo = new ResponseInfo(HttpCode.Conflict)
            responseInfo.errors = [new ResponseError(error.message, error.propertyName)]
        } else if (error instanceof MissedRequiredPropertiesException) {
            responseInfo = new ResponseInfo(HttpCode.Conflict)
            responseInfo.errors = [new ResponseError(error.message)]
        } else if (error instanceof FilesUploadException) {
            responseInfo = new ResponseInfo(HttpCode.Conflict);
            responseInfo.errors = [new ResponseError(error.message)];
        } else if (error instanceof RestException) {
            responseInfo = new ResponseInfo(HttpCode.Conflict)
            responseInfo.errors = [new ResponseError(error.message)]
        } else if (error instanceof NotFoundException) {
            responseInfo = new ResponseInfo(HttpCode.NotFound);
            responseInfo.errors = [new ResponseError(error.message)];
        } else if (error instanceof ValidationError) {
            responseInfo = new ResponseInfo(HttpCode.Conflict)
            responseInfo.errors = error.errors.map((errorItem: ValidationErrorItem) => {
                return new ResponseError(errorItem.message, errorItem.path)
            })
        } else {
            responseInfo = new ResponseInfo(HttpCode.InternalServerError)
        }

        res.status(responseInfo.status).json(responseInfo)
    }

    protected handleResponse<T>(res: Response, httpCode: HttpCode, data: T): void {
        const responseInfo = new ResponseInfo<T>(httpCode)
        responseInfo.data = data

        res.status(responseInfo.status).json(responseInfo)
    }
}

export enum HttpCode {
    Ok = 200,
    Created = 201,
    NotFound = 404,
    Conflict = 409,
    InternalServerError = 500
}

export class ResponseInfo<T> {
    status: number
    statusText: string
    errors: ResponseError[] = []
    data: T | string | null = null

    constructor(httpCode: HttpCode) {
        this.status = httpCode
        this.statusText = HttpCode[httpCode].replace(/[A-Z]/g, " $&").trim()
    }
}

export class ResponseError {
    message: string
    property: string | null

    constructor(message: string, property: string | null = null) {
        this.property = property
        this.message = message
    }
}

export default new Controller()
