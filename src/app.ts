import { Server } from "./presentation/server";
import { envs } from './application/plugins/envs.plugin';
const main:Function = async()=>{
    const server:Server = new Server(envs.PORT);
    server.run();
}

(async()=> {
    await main();
  })();
  