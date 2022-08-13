import Router from "@koa/router";

import { dbOpen } from "./db.js";

export const router = new Router();

dbOpen();

router.get("/", (ctx) => {
    ctx.body = "Hello World!";
});
