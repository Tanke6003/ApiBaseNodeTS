import { Sequelize, Options, QueryOptions } from "sequelize";
import { ISQLConnection } from "../../dominio/interfaces/plugins/ISQLConnection.interface";

export interface SequelizeConnectionConfig {
    dialect: string;
    host: string;
    port: number | string;
    username: string;
    password: string;
    database: string;
}

export class SequelizeConnection  implements ISQLConnection {
    private connection: Sequelize;

    constructor(config: SequelizeConnectionConfig) {
        this.connection = new Sequelize(config as Options);
        //this.authenticate();
    }

    async authenticate(): Promise<void> {
        try {
            await this.connection.authenticate();
            console.log('Database connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            throw new Error('Database connection failed.');
        }
    }

    async executeQuery(query: string, parameters?: any[]): Promise<any> {
        try {
            const queryOptions: QueryOptions = {
                replacements: parameters,
            };
            const [results,_] = await this.connection.query(query, queryOptions);
            return results;
        } catch (error:any) {
            throw new Error(`Error executing query: ${error.message}`);
        }
    }

    async close(): Promise<void> {
        await this.connection.close();
        console.log('Database connection closed.');
    }
}


