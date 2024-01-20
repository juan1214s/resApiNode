import { Router } from "express";
import { obtenerPedidos,insertarPedidos, actualizarEstado,eliminarPedido } from "../controles/pedidos.controladore.mjs";



const router = Router();


router.get('/mesero',obtenerPedidos); 
router.put('/mesero', actualizarEstado);
router.post('/mesero',insertarPedidos);
router.delete('/mesero',eliminarPedido);

export default router