//* Imports
const messagesControllers = require('./messages.controllers');
const responsesHandler = require('../utils/responsesHandler');

//* GET all messages by conversation
const getAllMessagesByConversation = ( req, res ) => {
    const conversationId = req.params.conversation_id;
    const userId = req.user.id;
    messagesControllers.findAllMessagesByConversation( conversationId, userId )
        .then( data => {
            if( data ){
                responsesHandler.successResponse({
                    res,
                    status: 200,
                    data,
                    message: 'Showing all messages in conversation with id: ' + conversationId
                });
            } else {
                responsesHandler.errorResponse({
                    res,
                    status: 401,
                    message: 'User unauthorized to see messages in this conversation.'
                });
            };
        })
        .catch( error => {
            responsesHandler.errorResponse({
                res,
                status: 400,
                message: 'Unable to fetch messages.',
                data: error
            });
        });
};

//* Exports
module.exports = {
    getAllMessagesByConversation
};