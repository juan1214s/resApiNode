import mysql from 'mysql';
import { config } from 'dotenv';

// Cargar configuración desde el archivo .env
config();

const dbSettings = {
    host: process.env.server,
    user: process.env.usuario,
    password: process.env.password,
    database: process.env.database,
    // Opciones adicionales según sea necesario
};

const connection = mysql.createConnection(dbSettings);

connection.connect((err) => {
    if (err) {
        console.error(`Error al conectar a la base de datos: ${err.message}`);
    } else {
        console.log('Conexión exitosa a la base de datos MySQL');
    }
});

// Función para realizar la consulta
async function fetchData() {
    try {
        const query = 'SELECT * FROM pedidos';
        connection.query(query, (error, results) => {
            if (error) {
                console.error(`Error al realizar la consulta: ${error.message}`);
            } else {
                console.log('Resultado de la consulta:', results);
            }
            // Cerrar la conexión después de la consulta
            connection.end();
        });
    } catch (error) {
        console.error(`Error en fetchData: ${error.message}`);
    }
}

// Llamar a la función para realizar la consulta
export default fetchData();

