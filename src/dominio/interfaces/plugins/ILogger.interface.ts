
 export interface ILogger {
    createLog(level: string, message: string): void;
    getLogs(level:string): any;
}