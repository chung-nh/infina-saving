const pg = require('knex')({
    client: 'pg',
    connection: "postgres://admin:123@localhost:5432/savings_database",
    searchPath: ['knex', 'public'],
});

module.exports = {
    pg
}