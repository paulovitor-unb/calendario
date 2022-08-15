import { useState, useEffect } from "react";
import { Task } from "../types/task";
import { APIService } from "../services/apiService";

export function useIndex() {
    const [tasksList, setTasksList] = useState<Task[]>([]),
        [task, setTask] = useState<Task | null>(null),
        [id, setId] = useState(0),
        [title, setTitle] = useState(""),
        [description, setDescription] = useState(""),
        [duration, setDuration] = useState(0),
        [datetime, setDatetime] = useState(0),
        [message, setMessage] = useState("");

    useEffect(() => {
        async () => {
            const response = await APIService.get("/tasks");
            setTasksList(response.data);
        };
    }, []);

    async function createTask() {
        if (task !== null) {
            const response = await APIService.post("/task", {
                title,
                description,
                duration,
                datetime,
            });
            try {
                setId(response.data.id);
                setTask(null);
            } catch (error) {
                setMessage(response.data.message);
            }
            return;
        }
    }

    function resetTaskForm() {
        setTitle("");
        setDescription("");
        setDuration(0);
        setDatetime(0);
    }

    return {
        tasksList,
        task,
        setTask,
        id,
        setId,
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
        createTask,
        resetTaskForm,
    };
}
