
const {verifyToken} = require('../utils/handleJwt')
const {handleHttpError}  = require('../utils/handleError')
const {usersModel} = require('../models')



const authMiddleware = async (req, res, next) =>{
    try {
        
        if (!req.headers.authorization) {
            handleHttpError(res, "NOT JWT TOKEN", 401)
            return
        }
        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token) 
        if (!dataToken._id) {
            handleHttpError(res, "ERROR ID TOKEN", 401)
            return
        }
        const user = await usersModel.findById(dataToken._id)
        req.user = user

        next()

    } catch (e) {
        handleHttpError(res, "NOT SESSION - PASSWORD EXPIRED", 401)
    }
}

module.exports = authMiddleware