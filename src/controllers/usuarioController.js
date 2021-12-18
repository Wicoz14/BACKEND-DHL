const { Router } = require("express");
const rutasUsuario = Router();
const { usuarioModel } = require("../models/usuarioModel.js")
const { compare, genSalt, hash } = require("bcryptjs");
const { sign, verify } = require("jsonwebtoken");
const { usuarioAuthGuard } = require("../Middleware/usuarioAuthGuard.js");
const { enviarCorreo, enviarCorreoRegistro } = require("./recuperarController.js")

rutasUsuario.post("/login", async function (req, res) {
    const { usuario, contraseña } = req.body;
    const user = await usuarioModel.findOne({ usuario });

    if (!user) {
        return res.status(401).send({ estado: "Error", msg: "Credenciales No Válidas" });
    }

    const passOK = await compare(contraseña, user.contraseña);
    if (passOK === true) {
        const token = sign(
            {
                usuario: user.usuario,
                rol: user.rol,
                id: user._id
            },
            process.env.JWT_SECRET_KEY
        )
        return res.status(200).send({ estado: "Ok", msg: "Logueado", token, rol: user.rol, recuperar: user.recuperar });
    }
    return res.status(401).send({ estado: "error", msg: "Credenciales NO válidas" });
});


rutasUsuario.post("/registrousuario", function (req, res) {
    // Captura los datos
    const data = req.body;
    const correo = data.correo;
    // Instancia el modelo y pobla con los datos
    const usuario = new usuarioModel(data);
    // Guarda en BD
    usuario.save(function (error) {
        if (error) {
            return res.status(500).send({ estado: "Error", msg: "Error: Usuario No Guardado" });
        }
        enviarCorreoRegistro(correo);
        return res.status(200).send({ estado: "Ok", msg: "Guardado" })
    });
});

rutasUsuario.post("/recuperarcontrasena", async function (req, res) {
    const correo = req.body;
    const email = await usuarioModel.findOne(correo);
    if (!email) {
        return res.status(401).send({ estado: "Error", msg: "Correo No Registrado" });
    }
    else {
        let nuevacontraseña = await enviarCorreo(email.correo);

        await usuarioModel.updateOne({ "correo": email.correo }, { "contraseña": nuevacontraseña, "recuperar":true})

        return res.status(200).send({ estado: "Ok", msg: "Contraseña Enviada" });
    }
});


rutasUsuario.post("/nuevacontrasena", usuarioAuthGuard, async function (req, res) {
    const authorization = req.headers.authorization;
    const {contraseña } = req.body;
    const salt = await genSalt(+process.env.BCRYPT_ROUNDS);
    nuevaContraseña = await hash(contraseña, salt);
    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.JWT_SECRET_KEY);
        await usuarioModel.updateOne({"usuario": payload.usuario},{"contraseña": nuevaContraseña , "recuperar": false})
        return res.status(200).send({ estado: "Ok", msg: "Contraseña Actualizada"});
    } catch (error) {

    }


    await usuarioModel.updateOne({"usuario": usuario},{"contraseña": nuevaContraseña , "recuperar": false})
    return res.status(200).send({ estado: "Ok", msg: "Contraseña Actualizada"});
});

exports.rutasUsuario = rutasUsuario;