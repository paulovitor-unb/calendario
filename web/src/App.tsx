import {
    Button,
    Dialog,
    DialogActions,
    Grid,
    TextField,
    Snackbar,
} from "@mui/material";

import { useIndex } from "./data/hooks/useIndex";
import List from "./ui/components/list/list";

function App() {
    const {
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
    } = useIndex();

    return (
        <>
            <Button
                variant={"contained"}
                onClick={() => {
                    setNewTask(true);
                }}
            >
                Inserir Tarefa
            </Button>
            <List tasks={tasksList} onSelect={(task) => setTask(task)} />
            <Dialog
                open={newTask}
                PaperProps={{ sx: { p: 5 } }}
                onClose={() => {
                    setNewTask(false);
                    resetTaskForm();
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label={"Título"}
                            type="text"
                            variant="standard"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label={"Descrição"}
                            type="text"
                            variant="standard"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label={"Duração"}
                            type="number"
                            variant="standard"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
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
                </Grid>
                <DialogActions sx={{ mt: 5 }}>
                    <Button
                        onClick={() => {
                            setNewTask(false);
                            resetTaskForm();
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button variant={"contained"} onClick={() => insertTask()}>
                        Inserir Tarefa
                    </Button>
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
