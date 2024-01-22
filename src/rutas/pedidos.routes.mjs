import { Router } from "express";
import { obtenerPedidos,insertarPedidos, actualizarEstado,eliminarPedido} from "../controles/pedidos.controladore.mjs";
import {verificacion,crearU} from "../controles/login.mjs"



const router = Router();

// Rutas relacionadas con el mesero
router.route('/mesero')
  .get(obtenerPedidos)
  .put(actualizarEstado)
  .post(insertarPedidos)
  .delete(eliminarPedido);

// Otras rutas
router.post('/login', verificacion);
router.post('/crearU', crearU);





export default router