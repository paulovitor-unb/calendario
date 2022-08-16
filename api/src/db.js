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
    createTasksTable: async () => {
        try {
            const db = await openDb();
            await db.exec(
                `CREATE TABLE IF NOT EXISTS tasks ${taskTableColumns}`
            );
        } catch (error) {
            console.log("Table creation failed!", error);
        }
    },

    selectAllTasks: async (ctx) => {
        try {
            const db = await openDb();
            const tasksList = await db.all(
                "SELECT * FROM tasks ORDER BY datetime"
            );
            ctx.body = tasksList;

            ctx.status = 200;
        } catch (error) {
            ctx.body = { ...error, message: "Tasks list selection failed!" };
            ctx.status = 400;
        }
    },

    selectSearchTasks: async (ctx) => {
        const title = ctx.request.query.title;

        try {
            const db = await openDb();
            const tasksSearch = await db.all(
                "SELECT * FROM tasks WHERE title LIKE %?% ORDER BY datetime",
                [title]
            );
            ctx.body = tasksSearch;

            ctx.status = 200;
        } catch (error) {
            ctx.body = { ...error, message: "Tasks search failed!" };
            ctx.status = 400;
        }
    },

    insertTask: async (ctx) => {
        const task = ctx.request.body;

        try {
            const db = await openDb();
            const newTask = await db.run(
                "INSERT INTO tasks (title, description, duration, datetime) VALUES (?, ?, ?, ?)",
                [task.title, task.description, task.duration, task.datetime]
            );
            ctx.body = { id: newTask.lastID };

            ctx.status = 200;
        } catch (error) {
            ctx.body = { ...error, message: "Task insertion failed!" };
            ctx.status = 400;
        }
    },

    updateTask: async (ctx) => {
        const task = ctx.request.body;

        try {
            const db = await openDb();
            await db.get(
                "UPDATE tasks SET title=?, description=?, duration=?, datetime=? WHERE id=?",
                [
                    task.title,
                    task.description,
                    task.duration,
                    task.datetime,
                    task.id,
                ]
            );

            ctx.body = { message: "Task Updated successfully!" };
            ctx.status = 200;
        } catch (error) {
            ctx.body = { ...error, message: "Task update failed!" };
            ctx.status = 400;
        }
    },

    deleteTask: async (ctx) => {
        const id = ctx.request.body.id;

        try {
            const db = await openDb();
            await db.get("DELETE FROM tasks WHERE id=?", [id]);

            ctx.body = { message: "Task deleted successfully!" };
            ctx.status = 200;
        } catch (error) {
            ctx.body = { ...error, message: "Task deletion failed!" };
            ctx.status = 400;
        }
    },
};
