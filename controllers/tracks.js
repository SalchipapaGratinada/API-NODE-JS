const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

/**
 * obtener lista de bases de datos
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const user = req.user
    const data = await tracksModel.find({});
    res.send({ data, user });
  } catch (e) {
    handleHttpError(res, "Error En Get Item");
  }
};

/**
 * obtener un detalle
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
    try {
        req = matchedData(req)
        const {id} = req
        const data = await tracksModel.findById(id)
        res.send({data})
    } catch (e) {
        handleHttpError(res, "error En El Get Item")
    }
};

/**
 * insertar un registro
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const body =  matchedData(req)
    const data = await tracksModel.create(body);    
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "Error En Create Item");
  }
};

/**
 * actualizar un registro
 * @param {*} req
 * @param {*} res
 */
const updateItem = async(req, res) => {
    try {
        const {id, ...body} =  matchedData(req)
        const data = await tracksModel.findOneAndUpdate(
            id, body
        );    
        res.send({ data });
      } catch (e) {
        handleHttpError(res, "Error En Actualizar Item");
      }
};

/**
 * eliminar un registro
 * @param {*} req
 * @param {*} res
 */

const deleteItem = async(req, res) => {
    try {
        req = matchedData(req)
        const {id} = req
        const data = await tracksModel.delete({_id:id})
        res.send({data})
    } catch (e) {
        handleHttpError(res, "error En El Delete Item")
    }
};

module.exports = {
  getItem,
  getItems,
  createItem,
  updateItem,
  deleteItem,
};
