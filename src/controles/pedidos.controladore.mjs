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

export const actualizarEstado = async (req, res) => {
  try {
    const { id_pedido, estado } = req.body;

    if (!id_pedido || !estado) {
      return res.status(400).json({ error: 'Se requieren tanto id_pedido como estado.' });
    }

    // Obtén una instancia del pool de conexiones
    const poolInstance = pool;

    // Utiliza la instancia del pool para realizar la consulta
    const resultado = await poolInstance.query(querys.actualizarEstados, [estado, id_pedido]);

    // console.log('Propiedades del objeto de resultado:', Object.keys(resultado));

    // Envía una respuesta exitosa al cliente
    res.json({ mensaje: 'Actualización exitosa' });
  } catch (error) {
    console.error(`El error es: ${error}`);

    // Envía una respuesta de error al cliente
    res.status(500).json({ error: 'Error al actualizar el estado en la base de datos.' });
  }
};


export const eliminarPedido = async(req,res)=>{
  try {

      const {id_pedido} = req.body;

  if(id_pedido === undefined){
    return res.status(400).json({error:'No se inserto el campo id'});
  }

  const poolInstance = pool;

  let resultado = await poolInstance.query(querys.eliminarPedido,{id_pedido});

  console.log(resultado);

  res.json({ mensaje: 'Eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al intentar eliminar el pedido' });
  }
}