const {
  users
} = require('../models')
const db = require('../models')
const User = db.users
const Bootcamp = db.bootcamps

const bcrypt = require('bcryptjs')


// Crear y Guardar Usuarios
/* exports.createUser = (user) => {
  return User.create({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    })
    .then(user => {
      console.log(`>> Se ha creado el usuario: ${JSON.stringify(user, null, 4)}`)
      return user
    })
    .catch(err => {
      console.log(`>> Error al crear el usuario ${err}`)
    })
} */

// Crear y Guardar Usuarios
exports.createUser = (req, res) => {
  if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password){
    res.status(400).send({
      message: "Todos los campos son requeridos!"
    });
    return;
  }

  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password)
  }

  return User.create(user)
    .then(user => {
      res.send(user)
    })
    .catch(err => {
      return err;
    })
}

// obtener los bootcamp de un usuario
exports.findUserById = (userId) => {
  return User.findByPk(userId, {
      include: [{
        model: Bootcamp,
        as: "bootcamps",
        attributes: ["id", "title"],
        through: {
          attributes: [],
        }
      }, ],
    })
    .then(users => {
      return users
    })
    .catch(err => {
      console.log(`>> Error mientras se encontraba los usuarios: ${err}`)
    })
}

// obtener todos los Usuarios incluyendo los bootcamp
exports.findAll = () => {
  return User.findAll({
    include: [{
      model: Bootcamp,
      as: "bootcamps",
      attributes: ["id", "title"],
      through: {
        attributes: [],
      }
    }, ],
  }).then(users => {
    return users
  })
}

// Actualizar usuarios
exports.updateUserById = (userId, fName, lName) => {
  return User.update({
      firstName: fName,
      lastName: lName
    }, {
      where: {
        id: userId
      }
    })
    .then(user => {
      return {"id": userId}
    })
    .catch(err => {
      console.log(`>> Error mientras se actualizaba el usuario: ${err}`)
    })
}

// Actualizar usuarios
exports.deleteUserById = (userId) => {
  return User.destroy({
      where: {
        id: userId
      }
    })
    .then(user => {
      return user
    })
    .catch(err => {
      console.log(`>> Error mientras se eliminaba el usuario: ${err}`)
    })
}