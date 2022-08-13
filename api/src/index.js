import { server } from "./setup.js";

const host = process.env.HOST;
const apiPort = process.env.API_PORT;

server.listen(apiPort, host, () => {
    console.log(`API server running at http://${host}:${apiPort}`);
});
