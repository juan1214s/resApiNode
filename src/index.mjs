import app from "./app.mjs";
import GetConnection from "./database/conexion.mjs";

async function obtenerData() {
    try {
        const resultadoConsulta = await GetConnection();

        if (resultadoConsulta && resultadoConsulta.length > 0) {
          
        } else {
            console.log("La consulta no devolvió resultados.");
        }
    } catch (error) {
        console.error(`Error al intentar obtener la conexión y realizar la consulta: ${error.message}`);
    }
}
//obtiene el valor del puerto de app
app.listen(app.get(`port`),()=>{
    obtenerData();
});

console.log(`El puerto q esta escuchando es`, app.get(`port`));


