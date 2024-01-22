import { pool } from "../database/conexion.mjs";
import querys from '../database/consultas.mjs'
import { encriptado, verificadoPassword } from "../encriptado/bcrypt.mjs"


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
      if (!nombre || !contrasena || tipoUsuario === undefined) {
        return res.status(400).json({ mensaje: 'Todos los campos deben estar presentes.' });
      }
      const encriptarContrasena = await encriptado(contrasena);
  
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