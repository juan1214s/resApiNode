import { Router } from "express";
import { obtenerPedidos,insertarPedidos } from "../controles/pedidos.controles.mjs";



const router = Router();


router.get('/mesero',obtenerPedidos);
router.post('/mesero', insertarPedidos);
// router.post('/mesero',obtenerPedidos);
// router.get('/Chef',pedidosChef);
// router.post('/Chef',pedidosChef);

export default router