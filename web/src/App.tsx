import {
    Button,
    Dialog,
    DialogActions,
    Grid,
    TextField,
    Snackbar,
} from "@mui/material";
import { Add, Save, Delete } from "@mui/icons-material";

import { useTasks } from "./data/hooks/useTasks";
import List from "./ui/components/list/list";

function App() {
    const {
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

        selectAllTasks,
        selectSearchTasks,
        insertTask,
        updateTask,
        deleteTask,
        loadTaskForm,
        resetTaskForm,
    } = useTasks();

    return (
        <>
            <h1>Calendário</h1>
            <Button
                variant={"contained"}
                onClick={() => {
                    setSelectedTask(undefined);
                }}
                sx={{ gap: 1 }}
            >
                Inserir <Add />
            </Button>
            <TextField
                label={"Busca por título"}
                onChange={(e) => {
                    e.target.value
                        ? selectSearchTasks(e.target.value)
                        : selectAllTasks();
                }}
            ></TextField>
            <List
                tasks={tasksList}
                onSelect={(task) => {
                    setSelectedTask(task);
                    loadTaskForm(task);
                }}
            />
            <Dialog
                open={selectedTask !== null}
                PaperProps={{ sx: { p: 5 } }}
                onClose={() => {
                    setSelectedTask(null);
                    resetTaskForm();
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label={"Título"}
                            variant="standard"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Data e hora"
                            type="datetime-local"
                            InputLabelProps={{ shrink: true }}
                            variant="standard"
                            value={datetime}
                            onChange={(e) => setDatetime(e.target.value)}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label={"Descrição"}
                            variant="standard"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label={"Duração (minutos)"}
                            type="number"
                            variant="standard"
                            value={duration}
                            onChange={(e) =>
                                setDuration(Number(e.target.value))
                            }
                        ></TextField>
                    </Grid>
                </Grid>
                <DialogActions sx={{ mt: 5 }}>
                    <Button
                        onClick={() => {
                            setSelectedTask(null);
                            resetTaskForm();
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant={"contained"}
                        onClick={() =>
                            selectedTask === undefined
                                ? insertTask()
                                : updateTask()
                        }
                        sx={{ gap: 1 }}
                    >
                        Salvar <Save />
                    </Button>
                    {selectedTask !== undefined && (
                        <Button
                            variant={"contained"}
                            color={"error"}
                            onClick={() => deleteTask()}
                            sx={{ gap: 1 }}
                        >
                            Excluir <Delete />
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
            <Snackbar
                open={message.length > 0}
                message={message}
                autoHideDuration={3000}
                onClose={() => setMessage("")}
            />
        </>
    );
}

export default App;
