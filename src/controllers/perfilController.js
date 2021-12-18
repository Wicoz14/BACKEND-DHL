const { Router } = require("express");
const rutasUsuario = Router();
const { usuarioModel } = require("../models/usuarioModel.js")
const { verify } = require("jsonwebtoken");

rutasUsuario.post("/mostrarperfil", async function (req, res) {
    const authorization = req.headers.authorization;
    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.JWT_SECRET_KEY);
        const respuesta = await usuarioModel.findOne({"usuario": payload.usuario})
        return res.status(200).send({ estado: "Ok", msg: "Perfil Actualizado",respuesta});
    } catch (error) {
        return res.status(401).send({ estado: "Error", msg: "Perfil No Actualizado" });
    }
    
});

rutasUsuario.post("/modificarperfil", async function (req, res) {
    const authorization = req.headers.authorization;
    const usuario = req.body;
    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.JWT_SECRET_KEY);
        await usuarioModel.updateOne({"usuario": payload.usuario},{"nombres":usuario.nombres, "apellidos":usuario.apellidos, "correo":usuario.correo})
        return res.status(200).send({ estado: "Ok", msg: "Perfil Actualizado"});
    } catch (error) {
        return res.status(401).send({ estado: "Error", msg: "Perfil No Actualizado" });
    }
});

exports.rutasUsuario = rutasUsuario;