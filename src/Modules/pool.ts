const pg = require('pg');

// TODO: should I setup interface declaration for config object?

let config: object = {
    host: 'localhost', // Server hosting the postgres database
    port: 5432, // env var: PGPORT
    database: 'typescript_test', // change this line if you want to use a different database
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

export = pool;