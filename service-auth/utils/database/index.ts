export const pg = require('knex')({
    client: 'pg',
    connection: "postgres://admin:123@database-saving:5432/auth_database",
    searchPath: ['knex', 'public'],
});