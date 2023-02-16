//* Successful response
const successResponse = ({ res, status, data, message }) => {
    res.status( status ).json({
        error: false,
        status,
        message,
        data
    });
};

//* Unsuccessful response
const errorResponse = ({ res, status, message, data, fields }) => {
    res.status( status ).json({
        error: true,
        status,
        message,
        fields
    });
};

//* Exports
module.exports = { successResponse, errorResponse };