const express = require('express')
const router = express.Router()
const uploadMiddleware = require('../utils/handleStorage')
const {getItem, getItems, updateItem, deleteItem, createItem} = require('../controllers/storage')
const {validatorGetItem} = require('../validators/storage')
/**
 * lista de items
 */

router.get("/",  getItems)

/**
 * detalla item
 */
router.get("/:id", validatorGetItem, getItem)

/**
 * delete item
 */
router.delete("/:id", validatorGetItem, deleteItem)

/**
 * crear items
 */
router.post("/", uploadMiddleware.single("myfile"), createItem)

module.exports = router