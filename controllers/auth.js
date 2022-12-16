const { matchedData } = require("express-validator");
const { usersModel } = require("../models");
const { tokenSign } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleError");
const { encrypt, compare } = require("../utils/handlePassword");

/**
 * este contralador es l encargado de regitrar un usuario
 * @param {*} req
 * @param {*} res
 */

const registerControler = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };
    const dataUser = await usersModel.create(body);
    dataUser.set("password", undefined, { strict: false });
    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "Errror reister user");
  }
};

/**
 * controlador encargado de iniciar session
 * @param {*} req
 * @param {*} res
 */
const loginControler = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await usersModel.findOne({email:req.email}).select('password name role email')
    if (!user) {
      handleHttpError(res, "Usuario No Existe", 404)
      return 
    }
    const hashPassword = user.get('password');
    const check = await compare(req.password, hashPassword)
    if (!check) {
      handleHttpError(res, "Contraseña incorrect", 401)
      return
    }
    user.set('password', undefined, {strict:false})
    const data = {
      token: await tokenSign(user),
      user
    }
    res.send({data})

  } catch (e) {
    console.log(e)
    handleHttpError(res, "Errror login user");
  }
};

module.exports = { registerControler, loginControler };
