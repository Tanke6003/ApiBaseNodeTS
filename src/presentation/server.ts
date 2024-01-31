import express, {  Request, Response, NextFunction, Router } from 'express';
import cors from 'cors';
import { RouterModule } from './routes/index.routes';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


export class Server{
    private app = express();
    private readonly port:number;
    private routes:Router[]=[]
    constructor(port:number){
        this.port = port;
        this.configureMiddleware();
        this.configureRoutes();
        this.configureErrorHandling();
        this.createSwaggerSpec();
    }

    private configureMiddleware():void{
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(express.static('public'));
    }

    private createSwaggerSpec():void{
        const options = {
          definition: {
            openapi: '3.0.0',
            info: {
              title: 'Test API',
              version: '0.0.1',
            },
          },
          apis: ['./src/presentation/routes/*.ts'],
        };
    
        const swaggerSpec = swaggerJsdoc(options);
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
      }  
    private configureRoutes():void{
        const routerModule = new RouterModule();
        this.routes = routerModule.getRoutes();
        this.app.get('/', (req: Request, res: Response) => {
            res.redirect('/api-docs');
          });
        this.app.use(this.routes);
    }
    private configureErrorHandling():void{
        this.app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
            console.error(err.stack);
            res.status(500).send('Something went wrong!');
        });
    }
    async run(){
        this.app.listen(this.port,()=>{
            console.log(`this app is running on\n http://localhost:${this.port}`);
        })
    }
}
