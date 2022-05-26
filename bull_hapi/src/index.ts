import * as Hapi from '@hapi/hapi';
import { Server ,Request, ResponseToolkit } from '@hapi/hapi';
import {sendEmail} from './queues/emailqueue';
async function run() {
    const server: Server = new Server({
        port: 3000,
        host: 'localhost'
    });



      
    function index(req: Request,res: ResponseToolkit): string {
        console.log("Processing request", req.info.id);
        return "done"
    }
    server.route({
        method: "GET",
        path: "/send-email",
        handler: (Request, ResponseToolkit) =>{

            sendEmail({emailID:'anhtuan150399@gmail.com'});
            return 'Hello Bull!';
        }
        
    });

    try {
        await server.start();
        console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
    } catch(err) {
        console.log(err);
    }
    process.on('unhandledRejection', (err) => {
        console.error("unhandledRejection");
        console.error(err);
        process.exit(1);
    });

}
run()