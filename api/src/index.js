import dotenv from "dotenv";

import { server } from "./setup.js";

dotenv.config();

server.listen(process.env.API_PORT, process.env.HOST, () => {
    console.log("API server running!");
});
