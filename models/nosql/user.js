const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')


const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String
        }, 
        edad:{
            type:Number
        },
        email:{
            type:String,
            unique: true
        }, 
        password:{
            type:String,
            select:false
        },
        role:{
            type:['user','admin'],
            default:'user'
        }
    },
    {
        timestamps:true, //registra createAt y el UpdateAt
        versionKey:false,
    }
)

UserSchema.plugin(mongooseDelete, {overrideMethods:"all"});

module.exports = mongoose.model('users', UserSchema)
