import app from "./app.mjs";

//obtiene el valor del puerto de app
app.listen(app.get(`port`));

console.log(`El puerto q esta escuchando es`, app.get(`port`));


