import { Router } from 'express'

export default interface IRouterAware {
    getRouter(): Router
}