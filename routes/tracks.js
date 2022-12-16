const express = require('express');
const { getItems, getItem, createItem, updateItem, deleteItem} = require('../controllers/tracks');
const router =  express.Router();
const {validatorCreateItem, validatorGetItem} = require('../validators/tracks')
const customHeader = require('../middleware/customHeader')
const authMiddleware = require('../middleware/session');
const checkRol = require('../middleware/rol');

/**
 * lista de items
 */
router.get('/',authMiddleware, getItems);

/**
 * obtener detalle de items
 */
router.get('/:id', authMiddleware, validatorGetItem, getItem);

/**
 * crear items
 */
router.post('/', authMiddleware, checkRol(["admin"]), validatorCreateItem, createItem);

/**
 * actualizar items
 */
router.put('/:id', authMiddleware, validatorGetItem, validatorCreateItem, updateItem);

/**
 * eliminar items
 */
router.delete('/:id', authMiddleware, validatorGetItem, deleteItem);

module.exports = router;