//* Imports
const db = require('../utils/database');
const { DataTypes } = require('sequelize');

//* Conversations table
const Conversations = db.define( 'conversations', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    profileImage:{
        type: DataTypes.STRING
    },
    /*
    createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
    },*/
    isGroup: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

//* Export
module.exports = Conversations;