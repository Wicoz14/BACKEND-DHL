const { verify } = require("jsonwebtoken");

function usuarioAuthGuard(req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(403).json({ estado: "Error", msg:"No Autorizado" });
    }
    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.JWT_SECRET_KEY);
        if (payload.rol !== "usuarioexterno"){
            return res.status(403).json({ estado: "Error", msg:"NO Autorizado2" });
        }
    } catch (error) {

    }
    next();
}

exports.usuarioAuthGuard = usuarioAuthGuard;