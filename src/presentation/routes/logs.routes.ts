import { Router } from "express";
import { LoggerService } from '../../application/services/logger.service';
import { Winston } from "../../application/plugins/winston.plugin";
import { LogsController } from '../controllers/logs.controller';

export class LogsRoutes {
    private router: Router;
    private logsController: LogsController;
    constructor(router: Router, ) {
        this.router = router;
        const LoggerPluginInstance = new Winston();
        const LoggerServiceInstance = new LoggerService(LoggerPluginInstance);
        this.logsController = new LogsController(LoggerServiceInstance);

        this.configureRoutes();
    }

    private configureRoutes() {
        this.router.get('/logs/:level', this.logsController.getLogs);
    }

    public getRouter() {
        return this.router;
    }
}