import { useState, useEffect } from "react";
import { Task } from "../types/task";
import { APIService } from "../services/apiService";

export function useIndex() {
    const [tasksList, setTasksList] = useState<Task[]>([]),
        [selectedTask, setSelectedTask] = useState<Task | undefined | null>(
            null
        ),
        [title, setTitle] = useState<string | null>(""),
        [description, setDescription] = useState<string | null>(""),
        [duration, setDuration] = useState<number | null>(0),
        [datetime, setDatetime] = useState<string | null>(""),
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
                setMessage(`Tarefa ${title} inserida com sucesso!`);
                setSelectedTask(null);
            })
            .catch((error) => {
                setMessage(error.response?.data.message);
            });
    }

    function updateTask() {
        APIService.put("/task", {
            id: selectedTask?.id,
            title,
            description,
            duration,
            datetime,
        })
            .then(() => {
                setMessage(`Tarefa atualizada com sucesso!`);
                setSelectedTask(null);
            })
            .catch((error) => {
                setMessage(error.response?.data.message);
            });
    }

    function deleteTask() {
        APIService.delete("/task", { data: { id: selectedTask?.id } })
            .then(() => {
                setMessage(`Tarefa excluída com sucesso!`);
                setSelectedTask(null);
            })
            .catch((error) => {
                setMessage(error.response?.data.message);
            });
    }

    function loadTaskForm(task: Task) {
        setTitle(task.title);
        setDescription(task.description);
        setDuration(task.duration);
        setDatetime(task.datetime);
    }

    function resetTaskForm() {
        setTitle("");
        setDescription("");
        setDuration(0);
        setDatetime("");
    }

    return {
        tasksList,
        selectedTask,
        setSelectedTask,
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
        updateTask,
        deleteTask,
        loadTaskForm,
        resetTaskForm,
    };
}
