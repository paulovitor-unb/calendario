/*
    Configura o host e porta para rodar o servidor (variáveis no arquivo .env)
*/

import { server } from "./setup.js";

server.listen(process.env.API_PORT, process.env.API_HOST, () => {
    console.log(
        `API server running at http://${process.env.API_HOST}:${process.env.API_PORT}`
    );
});
