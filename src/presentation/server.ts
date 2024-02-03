import express, {  Request, Response, NextFunction, Router } from 'express';
import cors from 'cors';
import { RouterModule } from './routes/index.routes';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { envs } from '../application/plugins/envs.plugin';
// import { MailOptions } from '../dominio/models/mailOptions.model';
// import { MailService } from '../application/services/mail.service';
// import { IMail } from '../dominio/interfaces/plugins/IMail.interface';
// import { NodeMailer } from '../application/plugins/nodeMailer.plugin';

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
        // const mailerConfig:MailOptions = {
        //     service: envs.MAILER_SERVICE,
        //     auth: {
        //         user: envs.MAILER_EMAIL,
        //         pass: envs.MAILER_SECRET_KEY
        //     }

        // };
        // const IMailInstance: IMail = new NodeMailer(mailerConfig);
        // const MailServiceInstance = new MailService(IMailInstance);
        //MailServiceInstance.sendMail('Ruben.Farias.1999@outlook.es', 'Para Ruben farias', 'este es un correo informativo');
    }

    private configureMiddleware():void{
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(express.static('public'));
    }

    private createSwaggerSpec():void{
      const routesPath ='./src/presentation/routes/*.ts';
      const dtosPath = './src/application/dtos/*.ts';
      const options: swaggerJsdoc.Options = {
        definition: {
          openapi: '3.0.0',
          info: {
            title: 'Test API',
            version: envs.API_VERSION,
            description: 'lorem in',
          },
          components: {
            securitySchemes: {
              bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
              },
            },
          },
          security: [{ bearerAuth: [] }],
        },
        apis: [routesPath, dtosPath],
      };
      
    
        const swaggerSpec = swaggerJsdoc(options);
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
      }  
    private configureRoutes():void{
        const routerModule = new RouterModule();
        this.routes = routerModule.getRoutes();
        this.app.get('/', (_req: Request, res: Response) => {
            res.redirect('/api-docs');
          });
        this.app.use(this.routes);
    }
    private configureErrorHandling():void{
        this.app.use(async (err: Error, _req: Request, res: Response, _next: NextFunction) => {
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