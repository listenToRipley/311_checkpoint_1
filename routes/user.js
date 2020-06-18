const express = require('express')
const router = express.Router()

const controller = require('../controllers/users')
//GETS

router.get('/users', controller.listUsers)

router.get('/users/:id', controller.showUser)

//POST
router.post('/users', controller.createUsers)

 //PUT
 router.put(('/users/:id'), controller.updateUser)

 //DELETE
 router.delete(('/users/:id'), controller.deleteUser)


module.exports = router