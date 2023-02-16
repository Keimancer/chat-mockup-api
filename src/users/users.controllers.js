//* Imports
const Users = require('../models/users.model');

//* GET all users
const findAllUsers = async() => {
    const data = await Users.findAll();
    return data;
};

//* GET user by ID
const findUserById = async id => {
    const data = await Users.findOne({
        where: {
            id: id
        }
    });
    return data;
};

//* POST new user
const createUser = async userObj => {
    const newUser = {
        firstName: userObj.firstName,
        lastName: userObj.lastName,
        email: userObj.email,
        password: userObj.password,
        profileImage: userObj.profileImage,
        isActive: userObj.isActive,
        phone: userObj.phone
    };
    const data = await Users.create( newUser );
    return data;
};

//* UPDATE user
const updateUser = async ( id, userObj ) => {
    const data = await Users.update( userObj, {
        where: {
            id: id
        }
    });
    return data[0];
};

//* DELETE user
const deleteUser = async id => {
    const data = await Users.destroy({
        where: {
            id: id
        }
    });
    return data;
};

//* Exports
module.exports = {
    findAllUsers,
    findUserById,
    createUser,
    updateUser,
    deleteUser
};