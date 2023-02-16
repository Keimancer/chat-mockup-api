//* Imports
const usersServices = require('./users.services');
const router = require('express').Router();

//* GET all users route
router.get( '/users', usersServices.getAllUsers );

//* POST new user
router.post( '/users', usersServices.postNewUser );

//* GET user by ID
router.get( '/users/:id', usersServices.getUserById );

//* UPDATE user
router.patch( '/users/:id', usersServices.patchUser );

//* DELETE user
router.delete( '/users/:id', usersServices.deleteUser );

//* Exports
module.exports = router;