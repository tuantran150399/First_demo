require("dotenv").config();
import mongoose from "mongoose";
import { Agenda } from "agenda";


const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nwjktif.mongodb.net/?retryWrites=true&w=majority`;
export const db_start = async () => {
  try {
    await mongoose
      .connect(connectionString, {
        keepAlive: true,
        keepAliveInitialDelay: 300000,
      })
      .then(() => {
        console.log("Database connected");
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
        console.log("1min -database is working fine");
        done();
      } else {
        console.log("dont have connection");
        done();
      }
    });
    await agenda.start();
    await agenda.every("1 minutes", "check connection");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
