import { server } from "./setup.js";

server.listen(process.env.API_PORT, process.env.HOST, () => {
    console.log("API server running!");
});
