const { verify } = require("jsonwebtoken");

function usuarioGuard(req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization) {
        next(res.status(403).json({ estado: "Error", msg:"No Autorizado" }));
    }
    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {

    }
    next();
}

exports.usuarioGuard = usuarioGuard;