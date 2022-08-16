/*
    Configura o axios para servir conexões com a API (APIService)
*/

import axios from "axios";

export const APIService = axios.create({
    baseURL: "http://localhost:9000",
    headers: {
        "Content-Type": "application/json",
    },
});
