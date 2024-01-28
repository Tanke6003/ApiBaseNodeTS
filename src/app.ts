import { Server } from "./presentation/server";
import { envs } from './infrastructure/plugins/envs.plugin';
const main:Function = ()=>{
    const server:Server = new Server(envs.PORT);
    server.run();
}

(async()=> {
    main();
  })();
  