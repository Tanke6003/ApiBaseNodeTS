import winston, { format, transports } from "winston";
import { ILogger } from "../../dominio/interfaces/plugins/ILogger.interface";
import * as fs from 'fs';

export class Winston implements ILogger {
  private logger!: winston.Logger;
  private logDir: string;

  constructor() {
    this.logDir = 'logs/';

    try {
       // Crea el directorio si no existe
       this.createLogDirectory();
 
       // Configura el logger con la fecha en el nombre de los archivos
       this.logger = winston.createLogger({
          level: 'info',
          format: format.combine(format.json()),
          transports: [
             new transports.File({ filename: `${this.logDir}error.log`, level: 'error' }),
             new transports.File({ filename: `${this.logDir}info.log`, level: 'info'}),
             //new transports.Console({ level: 'error' }),
          ],
       });
    } catch (error) {
       console.error('Error al configurar el logger:', error);
    }
  }

  private createLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir);
    }
  }

  public createLog(level: string, message: string) {
    const timestamp = new Date().toLocaleString();
    const logMessage = ` ${message}`;

    // Loguea el mensaje en el archivo y en la consola
    this.logger.log({
      level,
      message: logMessage,
      timestamp: ` [${timestamp}]` 
    });

  }

  public getLogs(level: string) {
    try {
      const logsContent = fs.readFileSync(`${this.logDir}${level}.log`, 'utf-8');
      const logs = logsContent.split('\n').filter(log => log.trim() !== '');
  
      // Parsea cada log para convertirlo en un objeto JSON
      const parsedLogs = logs.map(log => JSON.parse(log));
      return parsedLogs;
    } catch (error) {
      console.error('Error al leer los logs:', error);
      return [];
    }
  }
}
