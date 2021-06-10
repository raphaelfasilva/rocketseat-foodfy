const db = require('../../config/db')
module.exports = {
    all(callback) {
        db.query(`SELECT * from recipes  
    order by title`, function(err, results) {
            if (err) throw "data base error"
            callback(results.rows)
        })
    }
}