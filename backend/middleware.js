const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const format = require("pg-format");
const { verificarUsuario } = require("./queries");
const jwt = require("jsonwebtoken");

const verifyJWT = function (req, res, next) {
    const jwt = req.headers["Authorization"];
    if (!jwt) {
        return res.status(401).send("No se ha enviado el token");
    }
    next()
}

const validaLogin = (req, res, next) => {
    try {

        if (req.body.mail === "" || req.body.password === "")
            throw new Error({ code: 500, message: 'error.message' });
        next();
    } catch (error) {
        res.status(400).send("Falta el usuario o la contraseña");
    }
};

const usuarioExiste = async (req, res, next) => {
    try {
        await verificarUsuario(req.body.mail);
        next();
    } catch (error) {
        //throw new Error( { code: 500, message: error.message });    
        res.status(400).send(error);
    }
};


const verificarToken = async (req, res, next) => {
    try {

        const Authorization = req.header("Authorization");

        if (Authorization === undefined) {

            throw { code: 500, error: 'No se ha enviado el token de autorización' }
        }

        const token = Authorization.split(" ")[1];
        jwt.verify(token, process.env.TOKEN);
        next();
    } catch (error) {
        console.log(error);
        res.status(error.code || 500).send(error);
    }
};
const decodificarToken = (req, res, next) => {
    try {

        const Authorization = req.header("Authorization");
        const token = Authorization.split("Bearer ")[1];
        let correo = jwt.decode(token);
        next();
    } catch (error) {
        res.status(error.code || 500).send(error);
    }
}
module.exports = {
    verifyJWT,
    validaLogin,
    usuarioExiste,
    verificarToken,
    decodificarToken
};
