const { Router } = require("express");
const rutasDashboard = Router();
const { mensajeroModel } = require("../models/mensajeroModel.js")


rutasDashboard.post("/usuario", function (req, res) {
    // Captura los datos
    const data = req.body;
    const correo = data.correo;
    // Instancia el modelo y pobla con los datos
    const mensajero = new mensajeroModel(data);
    // Guarda en BD
    mensajero.save(function (error) {
        if (error) {
            return res.status(500).send({ estado: "Error", msg: "Error: Usuario No Guardado" });
        }
        /* enviarCorreoRegistro(correo);  */
        return res.status(200).send({ estado: "Ok", msg: "Guardado" })
    });
});

rutasDashboard.post("/Consultar", function(req, res){
    const {numerodocumento} = req.body
    mensajeroModel.findOne({numerodocumento}, function (error,mensajero){
        if(error){
            return res.send({estado:"error", msg:"No encontrado "})
        }else{
            if(mensajero !== null){
                res.send({estado:"ok", msg: "Encontrado", data: mensajero})
            }else{
                res.send({estado:"error", msg: "no encontrado" })
            }
        }

    }) // {numerodocumento:numerodocumento}



})

rutasDashboard.get("/listar", function(req, res){
    mensajeroModel.find(function (error,mensajero){
        if(error){
            return res.send({estado:"error", msg:"No encontrado "})
        }else{
            if(mensajero !== null){
                res.send({estado:"ok", msg: "Encontrado", data: mensajero})
            }else{
                res.send({estado:"error", msg: "no encontrado" })
            }
        }

    }) // {numerodocumento:numerodocumento}



})

rutasDashboard.post("/Eliminar", function(req, res){
    const {numerodocumento} = req.body
    mensajeroModel.deleteOne({numerodocumento}, function (error, mensajero){
        if(error){
            return res.send({estado:"error", msg:"No Eliminado"})
        } else{
            if(mensajero !== null){
                res.send({estado:"ok", msg: "Eliminado"})
            }else{
                res.send({estado:"error", msg: "No Eliminado" })
            }
        }
        
    }) // {numerodocumento:numerodocumento}



})



exports.rutasDashboard = rutasDashboard;