import { Card, CardContent, Typography, Input, Button } from "@mui/material";
import { Task } from "../../../data/types/task";

interface ListProps {
    tasks: Task[];
    onSelect: (task: Task) => void;
}

export default function List(props: ListProps) {
    return (
        <ul>
            {props.tasks.map((task) => (
                <Card key={task.id}>
                    <CardContent>
                        <Typography>{task.title}</Typography>
                        <Typography>{task.description}</Typography>
                        <Typography>{task.duration}</Typography>
                        <Input type="datetime-local" value={task.datetime} />
                        <Button
                            variant={"contained"}
                            onClick={() => props.onSelect(task)}
                        >
                            Selecionar Tarefa
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </ul>
    );
}
