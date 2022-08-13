import { server } from "./setup.js";

const host = "localhost";
const port = 3000;

server.listen(port, host, () => {
    console.log(`API server running at http://${host}:${port}`);
});
