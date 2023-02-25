//* Imports
const Conversations = require('../models/conversations.model');
const Participants = require('../models/participants.model');
const Users = require('../models/users.model');
const uuid = require('uuid');

//* Find all conversations by user
const findAllConversationsByUser = async userId => {
    const data = await Conversations.findAll({
        include: {
            model: Participants,
            where: {
                userId: userId
            }
        }
    });
    return data.map( ({ id, name, profileImage, isGroup, createdAt }) => ({ id, name, profileImage, isGroup, createdAt }) );
};

//* Create conversation
const createConversation = async ( convObj, ownerId, guestId ) => {
    const newConversation = {
        id: uuid.v4(),
        name: convObj.name,
        profileImage: convObj.profileImage,
        isGroup: convObj.isGroup
    };
    //* Validating guest user
    const guest = await Users.findOne({ where: { id: guestId } });
    if( !guest ){
        return false;
    };
    const generatedConversation = await Conversations.create( newConversation );
    //* Creating owner as a participant
    await Participants.create({
        id: uuid.v4(),
        userId: ownerId,
        conversationId: generatedConversation.id,
        isAdmin: true
    });
    //* Creating guest as a participant
    await Participants.create({
        id: uuid.v4(),
        userId: guestId,
        conversationId: generatedConversation.id,
        isAdmin: false
    });
    return generatedConversation;
};

//* Exports
module.exports = {
    findAllConversationsByUser,
    createConversation
};
