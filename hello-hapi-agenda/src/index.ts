import { Agenda } from "agenda";
import * as Hapi from "@hapi/hapi";
import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import {fileRoutes} from "./routes/fileRoutes"
import mongoose from "mongoose";
const connectionString = "mongodb://localhost:27017/Agenda";
async function run() {
  const server: Server = new Server({
    port: 3000,
    host: 'localhost'
  });
  

  //server.connection({ "host": "localhost", "port": 3000 });
  await mongoose
    .connect(connectionString, {
      keepAlive: true,
      keepAliveInitialDelay: 300000,
    })
    .then(() => {
      console.log("Database connected");
      console.log(mongoose.connection.readyState);
    });

  const agenda = new Agenda({
    db: { address: connectionString, collection: "Agenda" },
  });
  agenda.define("check connection", async (job, done) => {
    // mongoose.connection.readyState = 1  or 2 is connected
    if (
      mongoose.connection.readyState == 1 ||
      mongoose.connection.readyState == 2
    ) {
      console.log("connection is good");
      done();
    } else {
      console.log("dont have connection");
      done();
    }
  });
  await agenda.start();
  await agenda.every("1 minutes", "check connection");



   //UPLOAD
  fileRoutes(server);




  
  try {
    await server.start();
    console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
  } catch (err) {
    console.log(err);
  }
  process.on("unhandledRejection", (err) => {
    console.error("unhandledRejection");
    console.error(err);
    process.exit(1);
  });
}
run();
