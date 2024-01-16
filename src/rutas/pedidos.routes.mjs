import { Router } from "express";
import { obtenerPedidos } from "../controles/pedidos.controles.mjs";



const router = Router();

router.get('/mesero',obtenerPedidos);

export default router