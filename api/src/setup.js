import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";

import { router } from "./routes.js";

export const server = new Koa();

server.use(bodyParser());
server.use(cors());
server.use(router.routes());
server.use(router.allowedMethods());
