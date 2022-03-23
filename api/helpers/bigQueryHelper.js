// 3rd party dependencies
const config = require('config');
const { BigQuery } = require('@google-cloud/bigquery');

// Constants
const bigquery = new BigQuery(config.get('bigQuery'));
const dataLocation = config.get('bigQuery.dataLocation');

/**
 * Returns a list of users. For example, predicted by our ML Churn model
 * We assume that model trainer runs as a separate process and populates our table, for example, daily.
 * @param {Number} limit - SQL query parameter.
 *
 * @returns {Promise} Promise that resolves when BigQuery job finished
 */
 const getUserList = async(queryLimit) => {

    const options = {
        query: `
        select distinct
            user_id
        from
            analytics.user_churn
        order by
            user_id
        limit @limit
        `,
        location: dataLocation,
        params: { limit: queryLimit },
    };
    const [job] = await bigquery.createQueryJob(options);
    console.log(`Job ${job.id} started.`);
    const [rows] = await job.getQueryResults(); // Alternatively use job.getQueryResultsStream()

    if (rows.length === 0) {
        return null;
    }
    console.log(rows.map((row) => row.user_id));
    // Map output as array of users
    return rows.map((row) => row.user_id);

};

module.exports = {

    getUserList,
}
