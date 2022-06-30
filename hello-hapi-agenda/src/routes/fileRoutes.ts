import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import * as fs from "fs";
import {fileUpload} from "./validate";

export const fileRoutes = (server: Server) => {

  server.route({
    method: "POST",

    path: "/submit",
    options: {
      payload: {
        parse: true,
        allow: "multipart/form-data",
        multipart: { output: "stream" },
      },
      validate:{
        payload: fileUpload
      }
    },
    handler: async (request: Request, reply: ResponseToolkit) => {
      console.log("abc");
      console.log("acb", request.payload);
      const payload: any = request.payload;
      const data = payload.files;

      console.log("acb", data);

      return "ok";
    },
  });
};
