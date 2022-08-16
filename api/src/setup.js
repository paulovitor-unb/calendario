/*
    Configura servidor com os middlewares do Koa
    Configura variaveis de ambiente do arquivo .env
    Cria tabela para tarefas no banco de dados
*/

import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import dotenv from "dotenv";

import { router } from "./routes.js";
import { dbMethods } from "./db.js";

export const server = new Koa();

server.use(bodyParser());
server.use(cors());
server.use(router.routes());
server.use(router.allowedMethods());

dotenv.config();

dbMethods.createTasksTable();
