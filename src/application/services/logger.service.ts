import { ILogger } from "../../dominio/interfaces/plugins/ILogger.interface";


export class LoggerService {
  private logger: ILogger;
  constructor(logger: ILogger) {
    this.logger = logger;
  }

  public createLog(level: string, message: string) {
    this.logger.createLog(level, message);
  }
  public getLogs(level: string) {
    return this.logger.getLogs(level);
  }
}