const {response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = async(req, res = response) =>{
    
    const {limite, desde = 0} = req.query;
    const query = {estado: true}

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(desde)
            .limit(limite)
    ])

    res.json({
        total,
        usuarios
    })
}

const usuariosPut = async(req, res = response) => {
        const id = req.params.id;
        const{_id, password, google, correo, ...resto} = req.body;
        if(password){
            const salt = bcryptjs.genSaltSync(10);
            resto.password = bcryptjs.hashSync(password, salt);
        }
        const usuario = await Usuario.findByIdAndUpdate(id, resto);
        res.json(usuario)
}

const usuariosPost = async(req, res = response) => {
    
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //Guardar en base de datos
    await usuario.save();
    res.json({
        usuario
    })
  }
  
const usuariosPatch = (req, res = response) => {
      res.json({
          msg: 'Patch API - controlador'
      })
    }

const usuariosDelete = async(req, res = response) => {
    const {id} = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    const usuarioAutenticado = req.usuario;

    res.json({
        usuario,
        usuarioAutenticado
    })
  }



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}