const bcrypjs = require('bcryptjs')

/**
 * texto plano de la contraseña, contraseña sin encriptar
 * @param {*} passwordPlain 
 */

const encrypt = async (passwordPlain)=>{
    const hash = await bcrypjs.hash(passwordPlain, 10)
    return hash
}

/**
 * pasar contraseña, sin incritar y contraseña encriptada
 * @param {*} passwordPlain 
 * @param {*} hashPassword 
 */

const compare = async (passwordPlain, hashPassword)=>{
    return await bcrypjs.compare(passwordPlain, hashPassword)
}


module.exports = {encrypt, compare}