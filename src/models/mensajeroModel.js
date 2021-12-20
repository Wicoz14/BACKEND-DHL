const { model, Schema } = require("mongoose");
const { genSalt, hash } = require("bcryptjs"); 



const mensajeroSchema = new Schema({
    usuario: {
        type: "string",
        required: true,
        unique: true,
        min: 5
    },
    contraseña: {
        type: "string",
        required: true,
        min: 6
    }, 
    nombres: {
        type: "string",
        required: true,
        min: 4
    },
    apellidos: {
        type: "string",
        required: true,
        min: 5
    } ,
    tipodocumento: {
        type: "string",
        required: true,
        min: 6
    },
    numerodocumento: {
        type: "number",
        required: true,
        unique: true,
        min: 6
    },
    correo: {
        type: "string",
        required: true,
    },
    rol: {
        type: "string",
        required: true
    },
    recuperar: {
        type: "boolean"  
    }
 
});

mensajeroSchema.pre("save", async function (next) {
    const salt = await genSalt(+process.env.BCRYPT_ROUNDS);
    this.contraseña = await hash(this.contraseña, salt);
    next();
}) 

const mensajeroModel = model("mensajero", mensajeroSchema);

exports.mensajeroModel = mensajeroModel; 
