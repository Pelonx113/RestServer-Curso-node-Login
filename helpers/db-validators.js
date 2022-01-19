const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado`)
    }
};

const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${correo} ya existe`)
    }
}

const existeUsuarioPorID = async(id = '') => {
    const existeID = await Usuario.findById(id);
    if(!existeID){
        throw new Error(`El ID ${id} no existe`)
    }
}    

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorID
}