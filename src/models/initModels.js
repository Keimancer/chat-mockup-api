//* Imports
const Users = require('./users.model');
const Participants = require('./participants.model');
const Messages = require('./messages.model');
const Conversations = require('./conversations.model');

//* Table relationships
const initModels = () => {
    //* Users/Participants
    Users.hasMany( Participants );
    Participants.belongsTo( Users );

    //* Conversations/Participants
    Conversations.hasMany( Participants );
    Participants.belongsTo( Conversations );

    //* Messages/Participants
    Participants.hasMany( Messages );
    Messages.belongsTo( Participants );
};

//* Export
module.exports = initModels;