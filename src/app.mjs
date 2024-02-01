import express from "express";
import config from "./config.mjs";
import obtenerPedidos from "./rutas/pedidos.routes.mjs"
import cors from "cors"
import rateLimit from "express-rate-limit";

const app = express();
    
let port;

//steting
//Este caso importo el puerto definido
app.set(`port`,config.port);

const limit = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 5, // límite de peticiones por hora
    message: 'Has excedido el límite de peticiones por hora.',
});

app.use(limit);

app.use(cors());
//le digo al servidor q acepte formato json
app.use(express.json());
//para q tambien reciba datos de los formularios html
app.use(express.urlencoded({extended:false}));

app.use(obtenerPedidos);
export default app

