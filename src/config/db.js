const { Pool } = require("pg")

module.exports = new Pool({
    user: 'foodfy',
    password: "foodfy123@",
    host: "localhost",
    port: 5432,
    database: "foodfy"
})