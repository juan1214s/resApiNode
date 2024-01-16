import { config } from "dotenv"
//lee las variables de entorno q esten definiidas
config();

//si el puerto no esta definido cojo el 300
//pero estoy impoprtando el puerto desde las variables de entorno
export default{
    port: process.env.port || 3000
}
