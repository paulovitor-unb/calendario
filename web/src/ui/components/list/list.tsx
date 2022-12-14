/*
    Configura o componente da lista de tarefas carregadas do banco de dados
    Usa modelos do Material UI para criar cards para cada tarefa
*/

import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Typography,
    Input,
    Button,
} from "@mui/material";
import { Edit } from "@mui/icons-material";

import { Task } from "../../../data/types/task";
import { CardsList } from "./list.style";

interface ListProps {
    tasks: Task[];
    onSelect: (task: Task) => void;
}

export default function List(props: ListProps) {
    return (
        <CardsList>
            {props.tasks.map((task) => (
                <Card key={task.id} sx={{ p: 2, width: "100%", maxWidth: 300 }}>
                    <CardHeader title={task.title} sx={{ p: 0 }} />
                    <CardContent sx={{ my: 2, p: 0 }}>
                        <Input type="datetime-local" value={task.datetime} />
                        <Typography>{task.description}</Typography>
                        <Typography>
                            Duração: {task.duration} minutos
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ p: 0 }}>
                        <Button
                            variant={"contained"}
                            onClick={() => props.onSelect(task)}
                            sx={{ gap: 1 }}
                        >
                            Editar <Edit />
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </CardsList>
    );
}
