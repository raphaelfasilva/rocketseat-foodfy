const db = require('../../config/db')
const { date, age } = require('../../lib/util')
module.exports = {
    all(callback) {
        db.query(`SELECT * from chefs  
    order by name`, function(err, results) {
            if (err) throw "data base error"
            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
        INSERT INTO chefs(
            name,
            avatar_url,
            created_at
        ) VALUES ($1,$2,$3)
        RETURNING ID
        `
        const values = [
            data.name,
            data.avatar_url,
            date(Date.now()).iso
        ]
        db.query(query, values, function(err, results) {
            if (err) throw "data base error"
            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query('select * from chefs where id = $1', [id], function(err, results) {
            if (err) throw "data base error"
            callback(results.rows[0])
        })
    },
}