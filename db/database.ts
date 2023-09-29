import { Dialect, QueryInterface } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import { SequelizeStorage, Umzug } from 'umzug'

export default class Database {
    public readonly sequelize: Sequelize
    public readonly migrator: Umzug<QueryInterface>
    public readonly seeder: Umzug<QueryInterface>

    constructor() {
        this.sequelize = this.initSequelize()
        this.migrator = this.initMigrator(this.sequelize)
        this.seeder = this.initSeeder(this.sequelize)
    }

    public async connect(): Promise<void> {
        try {
            await this.sequelize.authenticate()
            console.log('Connection has been established successfully.')
        } catch (error) {
            console.error('Unable to connect to the database:', error)
        }
    }

    private initSequelize(): Sequelize {
        return new Sequelize({
            database: process.env.DATABASE,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            dialect: process.env.DB_DIALECT as Dialect,
            models: [__dirname + '../src/model'],
        })
    }
    
    private initMigrator(sequelize: Sequelize): Umzug<QueryInterface> {
        return new Umzug({
            migrations: {
                glob: __dirname + '/migrations/*.ts',
                resolve: ({ name, path, context }) => {
                    const migration = require(path || '')
                    
                    return {
                        name,
                        up: async () => migration.up(context, sequelize.Sequelize),
                        down: async () => migration.down(context, sequelize.Sequelize),
                    }
                }
            },
            context: sequelize.getQueryInterface(),
            storage: new SequelizeStorage({
                sequelize,
                modelName: process.env.MIGRATION_STORAGE_TABLE_NAME,
                tableName: process.env.MIGRATION_STORAGE_TABLE_NAME,
            }),
            logger: console
        })
    }

    private initSeeder(sequelize: Sequelize): Umzug<QueryInterface> {
        return new Umzug({
            migrations: {
                glob: __dirname + '/seeders/*.ts',
                resolve: ({ name, path, context }) => {
                    const seeder = require(path || '')
                    
                    return {
                        name,
                        up: async () => seeder.up(context, sequelize.Sequelize),
                        down: async () => seeder.down(context, sequelize.Sequelize),
                    }
                }
            },
            context: sequelize.getQueryInterface(),
            storage: new SequelizeStorage({
                sequelize,
                modelName: process.env.SEEDER_STORAGE_TABLE_NAME,
                tableName: process.env.SEEDER_STORAGE_TABLE_NAME,
            }),
            logger: console,
        })
    }
}