//* Imports
const db = require('../utils/database');
const { DataTypes } = require('sequelize');
const Participants = require('./participants.model');

//* Messages table
const Messages = db.define( 'messages', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    participantId: {
        type: DataTypes.UUID,
        allowNull:false,
        references: {
            model: Participants,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Sent'
    }
});

//* Exports
module.exports = Messages;