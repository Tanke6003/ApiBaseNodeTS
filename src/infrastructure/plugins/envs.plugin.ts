import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  DB_HOST: get('MYSQL_HOST').required().asString(), 
  DB_PORT: get('MYSQL_PORT').default(3306).asPortNumber(),
  DB_USER: get('MYSQL_USER').required().asString(), 
  DB_PASSWORD: get('MYSQL_PASSWORD').required().asString(),
  DB_NAME: get('MYSQL_DATABASE').required().asString(),
  MSSQL_PORT: get('MSSQL_PORT').default(1433).asPortNumber(),
  MSSQL_HOST: get('MSSQL_HOST').required().asString(),
  MSSQL_USER: get('MSSQL_SA_USER').required().asString(),
  MSSQL_PASSWORD: get('MSSQL_SA_PASSWORD').required().asString(),
  JWT_SECRET: get('JWT_SECRET').required().asString(),
  JWT_EXPIRES: get('JWT_EXPIRES').required().asString(),
};
