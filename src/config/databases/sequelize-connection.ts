import { Sequelize, Options } from "sequelize";

export interface SequelizeConnectionConfig {
    dialect: string;
    host: string;
    port: number | string;
    username: string;
    password: string;
    database: string;
}
export class SequelizeConnection {
    connection: Sequelize;

    constructor(config: SequelizeConnectionConfig) {
        this.connection = new Sequelize(config as Options);
        this.authenticate();
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

            const [results, metadata] = await this.connection.query(query
                , {
                replacements: parameters
            }
            );
            console.log(results);
            return results; // Devuelve todos los resultados
        } catch (error: any) {
            console.error(error);
            throw new Error(`Error executing query: ${error.message}`);
        }
    }
    
}