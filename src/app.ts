import ProductRouter from './routes/ProductRouter';
import Database from '../db/database';
import cors from 'cors';
import express, { Application } from 'express';

export default class App {
    private readonly app: Application
    private readonly db: Database

    constructor() {
        this.app = express()
        this.db = Database.getInstance()
        this.initPlugins()
        this.initRoutes()
    }

    async run(host: string, port: number): Promise<void> {
        try {
            await this.db.connect()
            await this.db.migrator.up()
            await this.db.seeder.up()

            this.app.listen(port, host, () => {
                console.log(`Server running on port http://${host}:${port}`)
            })
        } catch (error) {
            console.error('Failed to run application', error);
        }
    }

    private initPlugins(): void {
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(express.static(process?.env?.PUBLIC_DIR as string))
    }

    private initRoutes(): void {
        this.app.use("/api/products", ProductRouter)
    }
}
