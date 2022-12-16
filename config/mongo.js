const mongoose = require('mongoose')

const dbConnect = () =>{
    const BD_URI = process.env.BD_URI;
    mongoose.connect(BD_URI, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }, (err, res)=>{
        if (!err) {
            console.log('Conexion Correcta')
        }else{
            console.log('Error De Conexion')
        }
    })
}
mongoose.set('strictQuery', true);
module.exports = dbConnect