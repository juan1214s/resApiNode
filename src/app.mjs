import express from "express";
import config from "./config.mjs";

const app = express();

let port;

//steting
//Este caso importo el puerto definido
app.set(`port`,process.env.port)

export default app