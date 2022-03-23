// Node dependencies
const httpStatus = require('http-status-codes');

// Local dependencies
const bigQueryHelper = require('../helpers/bigQueryHelper'); // we will use this to handle any data warehouse logic we need

async function getUserList(req, res) {

    const limit = req.swagger.params.limit.value;
    console.log(`getUserList with [limit:${limit}]`);

    try {
        const result = await bigQueryHelper.getUserList(limit);
        if (!result) {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        return res.status(httpStatus.OK).send(result);
    } catch (error) {
        console.log('getUserList', error);

        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {

    getUserList,
}
