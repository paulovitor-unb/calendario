import { useState, useEffect } from "react";
import { Task } from "../types/task";
import { APIService } from "../services/apiService";

export function useIndex() {
    const [tasksList, setTasksList] = useState<Task[]>([]),
        [task, setTask] = useState<Task | null>(null),
        [newTask, setNewTask] = useState(false),
        [title, setTitle] = useState(""),
        [description, setDescription] = useState(""),
        [duration, setDuration] = useState(""),
        [datetime, setDatetime] = useState(""),
        [message, setMessage] = useState("");

    useEffect(() => {
        APIService.get("/tasks").then((response) => {
            setTasksList(response.data);
        });
    }, []);

    function insertTask() {
        APIService.post("/task", {
            title,
            description,
            duration,
            datetime,
        })
            .then(() => {
                setMessage(`Tarefa ${title} salva com sucesso!`);
                setNewTask(false);
            })
            .catch((error) => {
                setMessage(error.response?.data.message);
            });
    }

    function resetTaskForm() {
        setTitle("");
        setDescription("");
        setDuration("");
        setDatetime("");
    }

    return {
        tasksList,
        task,
        setTask,
        newTask,
        setNewTask,
        title,
        setTitle,
        description,
        setDescription,
        duration,
        setDuration,
        datetime,
        setDatetime,
        message,
        setMessage,

        insertTask,
        resetTaskForm,
    };
}
