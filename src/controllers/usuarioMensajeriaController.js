const { Router } = require("express");
const rutasUsuarioMensajeria = Router();
const { envioModel } = require("../models/envioModel.js")
const { verify } = require("jsonwebtoken");

rutasUsuarioMensajeria.post("/solicitudes",async function (req, res) {
    const authorization = req.headers.authorization;
    const token = authorization.split(" ")[1];
    const payload = await verify(token, process.env.JWT_SECRET_KEY);
    if(payload.rol==="usuariomensajeria"){
        const solicitudes = await envioModel.find({asignado: false});
        return res.status(200).send({ estado: "Ok", solicitudes })
    }
    return res.status(500).send({ estado: "Error", msg: "No Exiten Listas" });
    
});

rutasUsuarioMensajeria.post("/asignar",async function (req, res) {
    const authorization = req.headers.authorization;
    const token = authorization.split(" ")[1];
    const payload = await verify(token, process.env.JWT_SECRET_KEY);
    const respuesta = req.body;
    if(payload.rol==="usuariomensajeria"){
        await envioModel.updateOne({ "_id" : respuesta._id},{"asignado": true, "encargado": respuesta.encargado, estado: "Programado"});
        return res.status(200).send({ estado: "Ok", msg: "Envio Asignado"});
    }
    return res.status(500).send({ estado: "Error", msg: "No Fue Asignado" });
    
});

rutasUsuarioMensajeria.post("/estados",async function (req, res) {
    const authorization = req.headers.authorization;
    const token = authorization.split(" ")[1];
    const payload = await verify(token, process.env.JWT_SECRET_KEY);
    if(payload.rol==="usuariomensajeria"){
        const estados = await envioModel.find({asignado: true});
        return res.status(200).send({ estado: "Ok", estados })
    }
    return res.status(500).send({ estado: "Error", msg: "No Exiten Listas" });
    
});




exports.rutasUsuarioMensajeria = rutasUsuarioMensajeria;