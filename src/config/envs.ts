// envs.ts
import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
  DB_HOST: process.env.MYSQL_HOST || 'localhost', // Ajustado el nombre de la variable
  DB_PORT: process.env.MYSQL_PORT || 3306, // Ajustado el nombre de la variable
  DB_USER: process.env.MYSQL_USER || 'root', // Ajustado el nombre de la variable
  DB_PASSWORD: process.env.MYSQL_PASSWORD || 'tu_contraseña', // Ajustado el nombre de la variable
  DB_NAME: process.env.MYSQL_DATABASE || 'tu_base_de_datos', // Ajustado el nombre de la variable
};
