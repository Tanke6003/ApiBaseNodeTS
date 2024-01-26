import express, {  Request, Response, NextFunction, Router } from 'express';
import cors from 'cors';
import { RouterModule } from './routes/index.routes';


export class Server{
    private app = express();
    private readonly port:number;
    private routes:Router[]=[]
    constructor(port:number){
        this.port = port;
        this.configureMiddleware();
        this.configureRoutes();
        this.configureErrorHandling();
    }

    private configureMiddleware(){
        this.app.use(express.json());
        this.app.use(cors());
    }
    private configureRoutes() {
        const routerModule = new RouterModule();
        this.routes = routerModule.getRoutes();
        this.app.use(this.routes);
    }
    private configureErrorHandling() {
        this.app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
            console.error(err.stack);
            res.status(500).send('Something went wrong!');
        });
    }
    async run(){
        this.app.listen(this.port,()=>{
            console.log(`this app is running on\n http://localhost:${this.port}`)
        })
    }
}