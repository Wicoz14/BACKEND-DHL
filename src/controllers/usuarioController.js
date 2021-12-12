const { Router } = require("express");
const rutasUsuario = Router();
const { usuarioModel } = require("../models/usuarioModel.js")
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { usuarioGuard } = require("../guard/usuarioGuard.js");

rutasUsuario.post("/login", async function(req,res) {
    const {usuario, contraseña} = req.body;
    const user = await usuarioModel.findOne({usuario});

    if(!user){
        return res.status(401).send({ estado: "Error", msg: "Credenciales No Válidas" });
    }

    const passOK = await compare(contraseña, user.contraseña);
    if (passOK === true) {
        const token = sign(
            {
                usuario: user.usuario,
                rol: user.rol
            },
            process.env.JWT_SECRET_KEY
        )
        return res.status(200).send({ estado: "Ok", msg: "Logueado", token });
    }
    return res.status(401).send({ estado: "error", msg: "Credenciales NO válidas" });
});


rutasUsuario.post("/registrousuario", function (req, res) {
    // Captura los datos
    const data = req.body;
    // Instancia el modelo y pobla con los datos
    const usuario = new usuarioModel(data);
    // Guarda en BD
    usuario.save(function (error) {
        if (error) {
            return res.status(500).send({ estado: "Error", msg: "Error: Usuario No Guardado" });
        }
        return res.status(200).send({ estado: "ok", msg: "Guardado" });
    });
});

exports.rutasUsuario = rutasUsuario;