/*
    Cria o componente de id root para renderizar no layout em public/index.html
*/

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./ui/styles/global.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
