import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  DB_HOST: get('MYSQL_HOST').required().asString(), 
  DB_PORT: get('MYSQL_PORT').default(3306).asPortNumber(),
  DB_USER: get('MYSQL_USER').required().asString(), 
  DB_PASSWORD: get('MYSQL_PASSWORD').required().asString(),
  DB_NAME: get('MYSQL_DATABASE').required().asString()
};
