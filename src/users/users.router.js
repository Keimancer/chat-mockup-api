//* Imports
const usersServices = require('./users.services');
const router = require('express').Router();
const passportJwt = require('../middlewares/auth.middleware');

//* GET all users route
router.get( '/', usersServices.getAllUsers );

//* POST new user
router.post( '/', usersServices.postNewUser );

//* Protected GET my user
router.get( '/me', passportJwt, usersServices.getMyUser );

//* Protected PATCH my user
router.patch( '/me', passportJwt, usersServices.patchMyUser );

//* Protected DELETE my user
router.delete( '/me', passportJwt, usersServices.deleteMyUser );

//* GET user by ID
router.get( '/:id', usersServices.getUserById );

//* UPDATE user
router.patch( '/:id', passportJwt, usersServices.patchUser );

//* DELETE user
router.delete( '/:id', passportJwt, usersServices.deleteUser );

//* Exports
module.exports = router;