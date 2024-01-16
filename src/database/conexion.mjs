import mysql from 'mysql';
import { config } from 'dotenv';
import { error } from 'console';
import { rejects } from 'assert';

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
        console.error(`Error al conectar a la base de datos: ${err.stack}`);
    } else {
        console.log('Conexión exitosa a la base de datos MySQL');
    }
});

export function ConsultaDatabase(){
    return new Promise ((resolve,reject)=>{
        const query = 'SELECT * FROM pedidos';
        connection.query(query,(error, results)=>{
            if (error) {
                console.log(error.message);
                reject(error)
            }else{
                resolve (results);
            }
        })
    })
}

// Llamar a la función para realizar la consulta
export default ConsultaDatabase();


