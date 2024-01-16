import {ConsultaDatabase} from "../database/conexion.mjs"

export const obtenerPedidos = async (req, res) => {
  try {
    const resultados = await ConsultaDatabase();
    let resultadoFiltro = resultados.filter((p)=>p.estado === 'pedido');
    res.json(resultadoFiltro);
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).json({ error: 'Error al obtener los pedidos.' });
  }
};
