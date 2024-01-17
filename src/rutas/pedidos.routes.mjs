import { Router } from "express";
import { obtenerPedidos,insertarPedidos } from "../controles/pedidos.controles.mjs";



const router = Router();

router.post('/mesero', insertarPedidos);
router.get('/mesero',obtenerPedidos);
// router.post('/mesero',obtenerPedidos);
// router.get('/Chef',pedidosChef);
// router.post('/Chef',pedidosChef);

export default router