//* Dependencies
const express = require('express');
require('dotenv').config();

//* Configurations
const usersRouter = require('./users/users.router');
const responsesHandler = require('./utils/responsesHandler');
const db = require('./utils/database');
const initModels = require('./models/initModels');
const app = express();
app.use( express.json() );

//* Database authentication and syncing
db.authenticate()
    .then( () => {
        console.log( 'Database authenticated successfully.' );
    })
    .catch( error => {
        console.log( error );
    });

db.sync()
    .then( () => {
        console.log( 'Database synchronized successfully.' );
    })
    .catch( error => {
        console.log( error );
    });

//* Database models
initModels();

//* Root check
app.get( '/', ( req, res ) => {
    responsesHandler.successResponse({
        res,
        status: 200,
        message: 'Server started successfully.',
        data: {
            "users": "http://localhost:9000/api/v1/users",
            "conversations": "http://localhost:9000/api/v1/conversations",
        }
    });
});

//* Users router
app.use( '/api/v1', usersRouter );

//* Wrong route handling
app.use( '*', ( req, res ) => {
    responsesHandler.errorResponse({
        res,
        status: 404,
        message: 'URL not found. Check routes at ' + process.env.HOST
    });
});

//* Listen
app.listen( 9000, () => {
    console.log( 'Server started successfully on ' + process.env.HOST );
});