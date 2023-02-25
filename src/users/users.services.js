//* Imports
const usersControllers = require('./users.controllers');
const responsesHandler = require('../utils/responsesHandler');
const { hashPassword } = require('../utils/crypto');

//* GET all users
const getAllUsers = ( req, res ) => {
    usersControllers.findAllUsers()
        .then( data => {
            responsesHandler.successResponse({
                res,
                status: 200,
                data,
                message: 'All of the users are now on display.'
            });
        })
        .catch( error => {
            responsesHandler.errorResponse({
                res,
                status: 400,
                data: error,
                message: 'There was an error while trying to show all users.'
            });
        });
    };
    
//* GET my user
const getMyUser = ( req, res ) => {
    const id = req.user.id;
    usersControllers.findUserById( id )
        .then( data => {
            responsesHandler.successResponse({
                res,
                status: 200,
                data,
                message: 'Current user information.'
            }); 
        })
        .catch( error => {
            responsesHandler.errorResponse({
                res,
                status: 400,
                data: error,
                message: 'There was an error while trying to show your user information.'
            });
        });
};
    
//* GET user by ID
const getUserById = ( req, res ) => {
    const id = req.params.id;
    usersControllers.findUserById( id )
        .then( data => {
            if( data ){
                responsesHandler.successResponse({
                    res,
                    status: 200,
                    data,
                    message: 'Now displaying: User with id ' + data.id
                }); 
            } else {
                responsesHandler.errorResponse({
                    res,
                    status: 404,
                    message: 'User not found.'
                });
            };
        })
        .catch( error => {
            responsesHandler.errorResponse({
                res,
                status: 400,
                data: error,
                message: 'There was an error while trying to show the desired user.'
            });
        });
};

//* POST new user
const postNewUser = ( req, res ) => {
    const userObj = req.body;
    usersControllers.createUser( userObj )
        .then( data =>{
            responsesHandler.successResponse({
                res,
                status: 201,
                data,
                message: 'User created successfully.'
            });
        })
        .catch( error => {
            responsesHandler.errorResponse({
                res,
                status: 400,
                data: error,
                message: 'There was an error while trying to create a new user.',
                fields: {
                    firstName: "Firstname",
                    lastName: "Lastname",
                    email: "example@gmail.com",
                    password: "string",
                    profileImage: "example.com/image.png",
                    phone: "+57 314XXXXXXX"
                }
            });
        });
}

//* UPDATE user
const patchUser = ( req, res ) => {
    const id = req.params.id;
    const userObj = req.body;
    usersControllers.updateUser( id, userObj )
        .then( data => {
            if( data ){
                responsesHandler.successResponse({
                    res,
                    status: 200,
                    data,
                    message: 'User updated successfully.'
                }); 
            } else {
                responsesHandler.errorResponse({
                    res,
                    status: 404,
                    message: 'User not found.'
                });
            };
        })
        .catch( error => {
            responsesHandler.errorResponse({
                res,
                status: 400,
                data: error,
                message: 'There was an error while trying to update the desired user.'
            });
        });
};

//* UPDATE my user
const patchMyUser = ( req, res ) => {
    const id = req.user.id;
    const { firstName, lastName, email, password, profileImage, phone } = req.body;
    const userObj = {
        firstName,
        lastName,
        email,
        password: hashPassword( password ),
        profileImage,
        phone
    };
    usersControllers.updateUser( id, userObj )
        .then( data => {
            responsesHandler.successResponse({
                res,
                status: 200,
                data,
                message: 'Personal information updated successfully.'
            });
        })
        .catch( error => {
            responsesHandler.errorResponse({
                res,
                status: 400,
                data: error,
                message: 'There was an error while trying to update your personal information.'
            });
        });
};

//* DELETE user
const deleteUser = ( req, res ) => {
    const id = req.params.id;
    usersControllers.deleteUser( id )
        .then( data => {
            if( data ){
                responsesHandler.successResponse({
                    res,
                    status: 204,
                    data,
                    message: 'User deleted successfully.'
                }); 
            } else {
                responsesHandler.errorResponse({
                    res,
                    status: 404,
                    message: 'User not found.'
                });
            };
        })
        .catch( error => {
            responsesHandler.errorResponse({
                res,
                status: 400,
                data: error,
                message: 'There was an error while trying to delete the desired user.'
            });
        });
};

//* DELETE my user
const deleteMyUser = ( req, res ) => {
    const id = req.user.id;
    usersControllers.deleteUser( id )
        .then( data => {
            responsesHandler.successResponse({
                res,
                status: 204,
                data,
                message: 'User deleted successfully.'
            }); 
        })
        .catch( error => {
            responsesHandler.errorResponse({
                res,
                status: 400,
                data: error,
                message: 'There was an error while trying to delete your user.'
            });
        });
};

//* Exports
module.exports = {
    getAllUsers,
    getUserById,
    getMyUser,
    postNewUser,
    patchUser,
    patchMyUser,
    deleteUser,
    deleteMyUser
};