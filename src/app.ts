import { Server } from "./presentarion/server";
import { envs } from './config/envs';
const main:Function = ()=>{
    const server:Server = new Server(envs.PORT);
    server.run();
}

(async()=> {
    main();
  })();
  