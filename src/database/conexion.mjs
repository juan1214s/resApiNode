import mysql from 'mysql';
import { config } from 'dotenv';

// Cargar configuración desde el archivo .env
config();

// Configuración del pool de conexiones
const dbSettings = {
    host: process.env.server,
    user: process.env.usuario,
    password: process.env.password,
    database: process.env.database,
    // Opciones adicionales según sea necesario
};

// Crear el pool de conexiones
export const pool = mysql.createPool(dbSettings);

// Manejo de eventos en el pool
pool.on('connection', (connection) => {
  console.log('Nueva conexión establecida');
});

pool.on('error', (err) => {
  console.error(`Error en el pool de conexiones: ${err.message}`);
});
