import Database from '../db/database'
import express, { Application } from 'express'

export default class App {
    private readonly app: Application
    private readonly db: Database
    
    constructor() {
        this.app = express()
        this.db = new Database()
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
}
