const { Router } = require("express");
const rutasEnvio = Router();
const { envioModel } = require("../models/envioModel.js");
const { verify } = require("jsonwebtoken");

rutasEnvio.post("/registrarenvio",async function (req, res) {
    const authorization = req.headers.authorization;
    const token = authorization.split(" ")[1];
    const payload = await verify(token, process.env.JWT_SECRET_KEY);
    const data = req.body;
    data.usuario = payload.id;
    const envio = new envioModel(data);
    envio.save(await function (error) {
        if (error) {
            return res.status(500).send({ estado: "Error", msg: "Error: Registro No Guardado" });
        }
        return res.status(200).send({ estado: "Ok", msg: "Registro Guardado" })
    });
});


exports.rutasEnvio = rutasEnvio;
