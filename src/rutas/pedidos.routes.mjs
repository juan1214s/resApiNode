import { Router } from "express";
import { obtenerPedidos,insertarPedidos, actualizarEstado,eliminarPedido,verificacion, crearU} from "../controles/pedidos.controladore.mjs";



const router = Router();


router.get('/mesero',obtenerPedidos); 
router.put('/mesero', actualizarEstado);
router.post('/mesero',insertarPedidos);
router.delete('/mesero',eliminarPedido);
router.get('/login',verificacion);
router.post('/crearU',crearU);




export default router