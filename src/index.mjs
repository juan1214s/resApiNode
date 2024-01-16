import app from "./app.mjs"
import fetchData  from "./database/conexion.mjs";

console.clear()


//obtiene el valor del puerto de app
app.listen(app.get(`port`),()=>{
});

console.log(`El puerto q esta escuchando es`, app.get(`port`));




