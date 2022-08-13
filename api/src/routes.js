import Router from "@koa/router";

import { dbMethods } from "./db.js";

export const router = new Router();

router.get("/", (ctx) => {
    ctx.body = {
        statusCode: 200,
    };
});

router.get("/tasks", dbMethods.selectAllTasks);
router.get("/task", dbMethods.selectOneTask);
router.post("/task", dbMethods.insertTask);
router.put("/task", dbMethods.updateTask);
router.delete("/task", dbMethods.deleteTask);
