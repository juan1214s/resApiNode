import { pool } from "../database/conexion.mjs";

//consulta para la la pagina de mesero
export const ConsultaDatabase = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM pedidos';
    pool.query(query, (error, results) => {
      if (error) {
        console.error('Error en la consulta a la base de datos:', error.message);
        reject({ error: 'Error al realizar la consulta a la base de datos.' });
      } else {
        resolve(results);
      }
    });
  });
};

export const obtenerPedidos = async (req, res) => {
  try {
    const resultados = await ConsultaDatabase();
    res.json({ recorset: resultados });
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).json(error);
  }
};

export const insertarPedidos = (req,res)=>{
  res.json('Nwe product');
}