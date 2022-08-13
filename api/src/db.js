import sqlite3 from "sqlite3";
import { open } from "sqlite";

const taskTableColumns =
    "(id INTEGER PRIMARY KEY, " +
    "title TEXT NOT NULL, " +
    "description TEXT, " +
    "duration INTEGER NOT NULL, " +
    "datetime TIMESTAMP NOT NULL)";

function openDb() {
    return open({
        filename: `./${process.env.DB_NAME}.sqlite3`,
        driver: sqlite3.Database,
    });
}

export const dbMethods = {
    createTable: () => {
        openDb().then((db) => {
            db.exec(`CREATE TABLE IF NOT EXISTS tasks ${taskTableColumns}`);
        });
    },

    dropTable: () => {
        openDb().then((db) => {
            db.exec("DROP TABLE IF EXISTS tasks");
        });
    },

    selectAllTasks: (ctx) => {
        openDb().then((db) => {
            db.all("SELECT * FROM tasks").then((tasks) => (ctx.body = tasks));
        });
    },

    selectOneTask: (ctx) => {
        const id = ctx.request.body.id;
        openDb().then((db) => {
            db.get("SELECT * FROM tasks WHERE id=?", [id]).then(
                (task) => (ctx.response = task)
            );
        });
    },

    insertTask: (ctx) => {
        const task = ctx.request.body;
        openDb().then((db) => {
            db.run(
                "INSERT INTO tasks (title, description, duration, datetime) VALUES (?, ?, ?, ?)",
                [task.title, task.description, task.duration, task.datetime]
            );
        });
        ctx.body = { statusCode: 200 };
    },

    updateTask: (ctx) => {
        const task = ctx.request.body;
        openDb().then((db) => {
            db.run(
                "UPDATE tasks SET title=?, description=?, duration=?, datetime=? WHERE id=?",
                [
                    task.title,
                    task.description,
                    task.duration,
                    task.datetime,
                    task.id,
                ]
            );
        });
        ctx.body = { statusCode: 200 };
    },

    deleteTask: (ctx) => {
        const id = ctx.request.body.id;
        openDb().then((db) => {
            db.get("DELETE FROM tasks WHERE id=?", [id]).then((ctx) => ctx);
        });
        ctx.body = { statusCode: 200 };
    },
};
