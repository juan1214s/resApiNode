import express from "express";
import config from "./config.mjs";
import obtenerPedidos from "./rutas/pedidos.routes.mjs"

const app = express();

let port;

//steting
//Este caso importo el puerto definido
app.set(`port`,config.port);

//middleware

//le digo al servidor q acepte formato json
app.use(express.json());
//para q tambien reciba datos de los formularios html
app.use(express.urlencoded({extended:false}));

app.use(obtenerPedidos);
export default app

