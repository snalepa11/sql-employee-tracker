const {Pool} = require('pg')


const pool = new Pool({
    host: 'localhost',
    user: 'postgres', //check postgres username
    password: 'postgres',
    database: 'employee_tracker_db',
    port: 5432
})

module.exports = pool 