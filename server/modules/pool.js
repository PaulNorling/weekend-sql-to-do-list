const pg = require('pg');
const Pool = pg.Pool;

let pool;

if (process.env.DATABASE_URL) {
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}
else{

 pool = new pg.Pool({
    database: 'weekend-to-do-app', // name of db
    host: 'localhost', // db location
    port: 5432, 
    max: 10, 
    idleTimeoutMillis: 30000 
});
}

pool.on('connect', () => {
    console.log('PostgreSQL is connected');
});

pool.on('error', (error) => {
    console.log('Error with Postgres pool', error);
})

module.exports = pool;