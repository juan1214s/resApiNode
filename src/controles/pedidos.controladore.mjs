import { pool } from "../database/conexion.mjs";
import querys from '../database/consultas.mjs'
import { encriptado, verificadoPassword } from "../encriptado/bcrypt.mjs"


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
      return res.status(400).json({ mensaje: 'Todos los campos deben estar presentes.' });
    }

    // Obtén una instancia del pool de conexiones
    const poolInstance = pool;

    // Utiliza la instancia del pool para realizar la consulta
    const resultado = await poolInstance.query(querys.insertPedidos,
      [platillo, cantidad, cliente, precio, observaciones, estado]
    );

    console.log('Resultado de la consulta:', resultado);

    res.json('Nuevo producto insertado');
  } catch (error) {
    console.error('Error al insertar producto:', error.message);
    res.status(500).json({ mensaje: 'Error al insertar producto en la base de datos.' });
  }
};

export const actualizarEstado = async (req, res) => {
  try {
    const { id_pedido, estado } = req.body;

    if (!id_pedido || !estado) {
      return res.status(400).json({ mensaje: 'Se requieren tanto id_pedido como estado.' });
    }

    const poolInstance = pool;

    const resultado = await poolInstance.query(querys.actualizarEstados, [estado, id_pedido]);
    console.log(resultado)

    res.json({ mensaje: 'Actualización exitosa' });
  } catch (error) {
    console.error(`El error es: ${error}`);

    // Envía una respuesta de error al cliente
    res.status(500).json({ mensaje: 'Error al actualizar el estado en la base de datos.' });
  }
};


export const eliminarPedido = async (req, res) => {
  try {

    const { id_pedido } = req.body;
    if (id_pedido === undefined) {
      return res.status(400).json({ mensaje: 'No se inserto el campo id' });
    }
    const poolInstance = pool;
    let resultado = await poolInstance.query(querys.eliminarPedido, { id_pedido });
    console.log(resultado);

    res.json({ mensaje: 'Eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al intentar eliminar el pedido' });
  }
}


export const verificacion = async (req, res) => {

  const { nombre, contrasena } = req.body;

  pool.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre], async (err, results) => {
    if (err) {
      console.error('Error en la consulta SQL:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else if (results.length > 0) {
      const obtieneContrasena = results[0].contrasena
      const comparaContrasena = await verificadoPassword(contrasena, obtieneContrasena);
      console.log(comparaContrasena)
      if (comparaContrasena === true) {
        res.status(200).json({ mensaje: 'Usuario autenticado' });
      } else {
        res.status(401).json({ mensaje: 'Nombre de usuario o contraseña incorrectos' });
      }
    } else {
      // Credenciales incorrectas
      res.status(401).json({ mensaje: 'Nombre de usuario o contraseña incorrectos' });
    }
  });
};


export const crearU = async (req, res) => {

  try {
    const { nombre, contrasena, tipoUsuario } = req.body;
    const encriptarContrasena = await encriptado(contrasena);

    if (nombre === undefined || contrasena === undefined || tipoUsuario === undefined) {
      return res.status(400).json({ mensaje: 'Todos los campos deben estar presentes.' });
    }
    // Obtén una instancia del pool de conexiones
    const poolInstance = pool;

    // Utiliza la instancia del pool para realizar la consulta
    const resultado = await poolInstance.query(querys.crearUsuario,
      [nombre, encriptarContrasena, tipoUsuario]
    );

    res.json('Nuevo usuario creado');

  } catch (error) {
    console.error('Error al insertar producto:', error.message);
    res.status(500).json({ mensaje: 'Error al insertar usuario en la base de datos.' });
  }

}