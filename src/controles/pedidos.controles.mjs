import { pool} from "../database/conexion.mjs";
import querys from '../database/consultas.mjs'


//consulta para la la pagina de mesero
export const ConsultaDatabase = () => {
  return new Promise((resolve, reject) => {
    const query = querys.getAllpedidos;
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

//aca se resulve la promesa
export const obtenerPedidos = async (req, res) => {
  try {
    const resultados = await ConsultaDatabase();
    res.json({ recorset: resultados });
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).json(error);
  }
};

export const insertarPedidos = async (req, res) => {
  try {
    // con el req.body puedes mostrar el contenido de la solicitud o capturarlo
    const { platillo, cantidad, cliente, precio, observaciones, estado } = req.body;

    //si alguno de los campos esta vacio no continua con la ejecuciòn
    if (
      platillo === undefined ||
      cantidad === undefined ||
      cliente === undefined ||
      precio === undefined ||
      observaciones === undefined ||
      estado === undefined
    ) {
      return res.status(400).json({ error: 'Todos los campos deben estar presentes.' });
    }

    // Obtén una instancia del pool de conexiones
    const poolInstance =  pool;

    // Utiliza la instancia del pool para realizar la consulta
    const resultado = await poolInstance.query(querys.insertPedidos,
      [platillo, cantidad, cliente, precio, observaciones, estado]
    );

    console.log('Resultado de la consulta:', resultado);

    res.json('Nuevo producto insertado');
  } catch (error) {
    console.error('Error al insertar producto:', error.message);
    res.status(500).json({ error: 'Error al insertar producto en la base de datos.' });
  }
};
