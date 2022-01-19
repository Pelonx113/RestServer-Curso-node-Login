const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generarJWT");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    // Verificar correo existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario/Constraseña incorrecta - correo",
      });
    }

    //usuario activo en DB
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario/Constraseña incorrecta - estado:false",
      });
    }

    //verificar contraseña

    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario/Constraseña incorrecta - password",
      });
    }

    //generar JWT
    const token = await generarJWT(usuario.id);
    res.json({
      usuario,
      token,
    });

  } catch (error) {
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
