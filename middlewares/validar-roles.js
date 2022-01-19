const { response } = require("express");
const { json } = require("express/lib/response");
const usuario = require("../models/usuario");


const esAdminRole = (req, res = response, next) => {
    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se esta verificando el rol sin token definido'
        })
    }


    const {rol, nombre} = req.usuario;

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador`
        })
    }

    next();
}

const tieneRole = (...roles) => {
    
    
    return(req, res = response, next) => {
        if(!req.usuario){
            return res.status(500).json({
                msg: 'Se esta verificando el rol sin token definido'
            })
        }
        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `Accion requiere uno de estos roles ${roles}`
            })
        }
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}