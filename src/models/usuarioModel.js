const { model, Schema } = require("mongoose");
const { genSalt, hash } = require("bcryptjs");

const usuarioSchema = new Schema({
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
    },
    tipodocumento: {
        type: "string",
        required: true,
        min: 6
    },
    numerodocumento: {
        type: "number",
        required: true,
        min: 6
    },
    correo: {
        type: "string",
        required: true,
    },
    rol: {
        type: "string",
        required: true
    }
});

usuarioSchema.pre("save", async function (next) {
    const salt = await genSalt(+process.env.BCRYPT_ROUNDS);
    this.contraseña = await hash(this.contraseña, salt);
    next();
})

const usuarioModel = model("usuarios", usuarioSchema);

exports.usuarioModel = usuarioModel;