import express, { Application } from "express";
require("dotenv").config();
import { db_start } from "./mongoDB/mongoconnect";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import userRoutes from './routers/usersRouter';
import * as swaggerDocument from './swagger.json';

const PORT = process.env.PORT || 8080;

const app: Application = express();
app.use(morgan("tiny"));
app.use(express.static("public"));
try {
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );
} catch (err) {
  console.log("Unable to load swagger.json", err);
}


app.use('/users',userRoutes);


app.get("/ping", async (_req, res) => {
  res.send({
    message: "Hello",
  });
});
db_start();
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
