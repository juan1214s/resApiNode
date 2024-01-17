import express from "express";
import config from "./config.mjs";
import obtenerPedidos from "./rutas/pedidos.routes.mjs"

const app = express();

let port;

//steting
//Este caso importo el puerto definido
app.set(`port`,config.port);

app.use(obtenerPedidos);
export default app

