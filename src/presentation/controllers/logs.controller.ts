import { LoggerService } from "../../application/services/logger.service";
import { Request, Response } from "express";

export class LogsController {
    private loggerService: LoggerService;
    constructor(loggerService: LoggerService) {
        this.loggerService = loggerService;
    }

    public getLogs = async(req: Request, res: Response) => {
        try {
            const level = req.params.level;
            const logs = this.loggerService.getLogs(level);
            res.status(200).json(logs); 
        } catch (error) {
            res.status(500).send(error);
        }
    }
}