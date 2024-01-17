import app from "./app.mjs"


console.clear()



// app.get('/', (req, res) => {
//     res.send('¡Hola, esta es la ruta predeterminada!');
//   });
//obtiene el valor del puerto de app
app.listen(app.get(`port`),()=>{
});

console.log(`El puerto q esta escuchando es`, app.get(`port`));




