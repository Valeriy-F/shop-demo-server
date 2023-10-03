import IRouterAware from './IRouterAware'
import { Router } from 'express'

export default abstract class ARouter implements IRouterAware {
    protected readonly router: Router

    constructor() {
        this.router = Router()
        this.initRoutes()
    }

    public getRouter(): Router {
        return this.router
    }

    protected abstract initRoutes(): void
}