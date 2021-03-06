var express = require('express');
var router = express.Router();
const dataUsuarios = require('../data/usuarios');


//---------LISTAR TODOS---------------
router.get('/', async function(req, res, next) {
  let usuarios = await dataUsuarios.getUsuarios();
  res.json(usuarios);
});

//---------BUSCAR UNO---------------
router.get('/:id', async (req, res)=>{
  let usuario = await dataUsuarios.getUsuario(req.params.id);
  res.json(usuario);
});

//---------INSERTAR UNO---------------
router.post('/', async (req, res) => {
  /* FORMATO A ENVIAR
  {
    "idDoc": 4,
    "nombre": "Carlos Acosta",
    "password": "iop123",
    "email": "acosta@mail.com",
    "edad": 43
  }
  */

  let usuario = {
    idDoc: req.body.idDoc,
    nombre: req.body.nombre,
    password: req.body.password,
    email: req.body.email,
    edad: req.body.edad,
    pets: []
      
  };

  let result = await dataUsuarios.pushUsuario(usuario)
  .catch((error)=>{console.log(error)});

  res.send(result);
});

//---------ELIMINAR UNO---------------
router.delete('/:id', async (req, res)=>{
  let usuario = await dataUsuarios.deleteUsuario(req.params.id);
  res.send(`Usuario eliminado: ${usuario}`);
});

module.exports = router;