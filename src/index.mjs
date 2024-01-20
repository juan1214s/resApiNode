import app from "./app.mjs"


console.clear()

app.listen(app.get(`port`),()=>{
});

console.log(`El puerto q esta escuchando es`, app.get(`port`));




