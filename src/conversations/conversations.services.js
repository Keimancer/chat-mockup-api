//* Imports
const conversationsControllers = require('./conversations.controllers');
const responsesHandler = require('../utils/responsesHandler');

//* GET conversations by user
const getAllConversationsByUser = ( req, res ) => {
    const userId = req.user.id;
    conversationsControllers.findAllConversationsByUser( userId )
        .then( data => {
            responsesHandler.successResponse({
                res,
                status: 200,
                data,
                message: data.length ? 'Showing all your conversations.' : 'No conversations to show.'
            });
        })
        .catch( error => {
            responsesHandler.errorResponse({
                res,
                status: 400,
                message: 'Something bad happened.',
                data: error
            });
        });
};

//* POST new conversation
const postNewConversation = ( req, res ) => {
    const { guestId, ...convObj } = req.body;
    const ownerId = req.user.id;
    conversationsControllers.createConversation( convObj, ownerId, guestId )
        .then( data => {
            if( data ){
                responsesHandler.successResponse({
                    res,
                    status: 201,
                    data,
                    message: 'Conversation created successfully.'
                });
            } else {
                responsesHandler.errorResponse({
                    res,
                    status: 404,
                    message: 'User with id: ' + guestId + 'not found.',
                    data
                });
            };
        })
        .catch( error => {
            responsesHandler.errorResponse({
                res,
                status: 400,
                message: 'Something went bad.',
                data: error,
                fields: {
                    name: 'String',
                    profileImage: 'String (optional)',
                    isGroup: 'Boolean',
                    guestId: 'UUID'
                }
            });
        });
};

//* Exports
module.exports = {
    getAllConversationsByUser,
    postNewConversation
};