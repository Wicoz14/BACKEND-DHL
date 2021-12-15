const { model, Schema } = require("mongoose");

const envioSchema = new Schema({
    fecharecogida: {
        type: "date",
        required: true,
    },
    alto: {
        type: "double",
        required: true,
        min: 1
    },
    largo: {
        type: "double",
        required: true,
        min: 1
    },
    ancho: {
        type: "double",
        required: true,
        min: 1
    },
    direccion: {
        type: "string",
        required: true,
        min: 4
    },
    departamento: {
        type: "string",
        required: true,
    },
    ciudad: {
        type: "string",
        required: true,
    },
    departamentoentrega: {
        type: "string",
        required: true,
    },
    ciudadentrega: {
        type: "string",
        required: true,
    },
    direccionentrega: {
        type: "string",
        required: true,
        min: 4
    },
    documentoentrega: {
        type: "string",
        required: true,
        min: 6
    },
    nombreentrega: {
        type: "string",
        required: true,
        min: 4
    }


});

const envioModel = model("envios", envioSchema);

exports.envioModel = envioModel;