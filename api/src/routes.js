/*
    Define as rotas aceitas via API e direciona para a função correspondente do banco de dados (db.js)
*/

import Router from "@koa/router";

import { dbMethods } from "./db.js";

export const router = new Router();

router.get("/", (ctx) => {
    ctx.body = "API server running!";
});

router.get("/tasks", dbMethods.selectAllTasks);
router.post("/task", dbMethods.insertTask);
router.put("/task", dbMethods.updateTask);
router.delete("/task", dbMethods.deleteTask);
