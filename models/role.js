const { Schema, model } = require('mongoose');


const RoleSchema = Schema({
    rol:{
        type: String,
        required: [true, 'El rol el obligatorio']
    } 
    
});

module.exports = model('Role', RoleSchema)