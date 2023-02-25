//* Imports
const Messages = require('../models/messages.model');
const Participants = require('../models/participants.model');

//* Find all messages
const findAllMessagesByConversation = async ( conversationId, userId ) => {
    const data = await Messages.findAll({
        include: {
            model: Participants,
            where: {
                conversationId: conversationId,
                userId: userId
            }
        }
    });
    return data;
};

//* Validate if user is on the conversation
const validateUserOnConversation = async ( userId, conversationId ) => {
    const data = await Participants.findOne({
        where: {
            userId,
            conversationId
        }
    });
    return data;
};

//* Exports
module.exports = {
    findAllMessagesByConversation
};