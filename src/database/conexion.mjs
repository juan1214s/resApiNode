import sql from 'mssql';
import { config } from 'dotenv';

// Cargar configuración desde el archivo .env
config();

const dbSettings = {
    user: process.env.usuario,
    password: process.env.password,
    server: process.env.server,
    database: process.env.database,
    options: {
        encrypt: true,//es un permiso por si voy a desplegar en azure
        trustServerCertificate: true, 
    },
}
console.log(dbSettings)
async function GetConnection() {
    try {
        let pool = await sql.connect(dbSettings);
        console.log('Conexión exitosa a la base de datos');

        const result = await pool
            .request()
            .query('SELECT * FROM covidAntioquia');

        return result.recordset;
    } catch (error) {
        console.error(`Error al conectar a la base de datos: ${error.message}`);
        throw error; // Relanzar el error para manejarlo externamente
    } finally {
        // Asegurarse de cerrar la conexión después de usarla
        if (sql) {
            try {
                await sql.close();
                console.log('Conexión cerrada correctamente');
            } catch (closeError) {
                console.error(`Error al cerrar la conexión: ${closeError.message}`);
            }
        }
    }
}

// Llamar a la función para obtener la conexión y realizar la consulta
export default GetConnection;
