const pg = require('pg');
let pool;

// When our app is deployed to the internet 
// we'll use the DATABASE_URL environment variable
// to set the connection info: web address, username/password, db name
// eg: 
//  DATABASE_URL=postgresql://jDoe354:secretPw123@some.db.com/prime_app
if (process.env.DATABASE_URL) {
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}
// When we're running this app on our own computer
// we'll connect to the postgres database that is 
// also running on our computer (localhost)
else {
    pool = new pg.Pool({
        host: 'localhost',
        port: 5432,
        database: 'grid_iron', 
    });
}

// let config: object = {
//     host: 'localhost', // Server hosting the postgres database
//     port: 5432, // env var: PGPORT
//     database: 'grid_iron', // change this line if you want to use a different database
//     max: 10, // max number of clients in the pool
//     idleTimeoutMillis: 30000,
// };

// const pool = new pg.Pool(config);

export = pool;