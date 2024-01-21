import {hash, compare} from "bcrypt"


export const encriptado = async (pass)=>{
    const passHash = await hash(pass, 5);
    return passHash;
}

export const verificadoPassword = async (pass, passHash)=>{
    const verificar = await compare(pass, passHash)
    return verificar
}


