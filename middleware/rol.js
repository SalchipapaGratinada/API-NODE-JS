const { handleHttpError } = require("../utils/handleError");

/**
 * array con los roles permitidos
 * @param {*} rol
 * @returns
 */
const checkRol = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    console.log({user})
    const rolesByUser = user.role;
    const checkValuerol = roles.some((rolSingle)=>rolesByUser.includes(rolSingle))
    if (!checkValuerol) {
        handleHttpError(res, "EL USUARIO NO TIENE PERMISOS", 403)
        return 
    }
    next();
  } catch (error) {
    handleHttpError(res, "ERROR ROL PERMISOS", 403)
  }
};

module.exports = checkRol;
