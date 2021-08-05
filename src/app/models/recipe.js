const db = require('../../config/db')
const { date, age } = require('../../lib/util')
module.exports = {
    all(callback) {
        db.query(`SELECT recipes.*,chefs.name AS author
        from recipes 
        LEFT JOIN chefs on (recipes.chef_id = chefs.id)
        order by title`, function(err, results) {
            if (err) throw err
            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
        INSERT INTO recipes(
            chef_id,
            image,
            title,
            ingredients,
            preparation,
            information,
            created_at
        ) VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING ID
        `
        const values = [
            1,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).iso
        ]
        db.query(query, values, function(err, results) {
            if (err) throw err
            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`SELECT recipes.*,chefs.name AS author
        from recipes 
        LEFT JOIN chefs on (recipes.chef_id = chefs.id) where recipes.id = $1`, [id], function(err, results) {
            if (err) throw err
            callback(results.rows[0])
        })
    },
    findBy(filter, callback) {
        db.query(`SELECT recipes.*,chefs.name AS author
        from recipes 
        LEFT JOIN chefs on (recipes.chef_id = chefs.id)
        where chefs.name ilike '%${filter}%' 
        order by name`, function(err, results) {
            if (err) throw ("data base error")
            callback(results.rows)
        })
    },
    update(data, callback) {
        const query = `
        update recipes SET 
        image=($1),
        chef_id=($2),
        title=($3),
        ingredients=($4),
        preparation=($5),
        information=($6)
        where id=$7
     `
        const values = [
            data.image,
            data.chef_id,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ]
        db.query(query, values, function(err, res) {
            if (err) throw err
            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM recipes where id = $1`, [id], function() {
            callback()
        })
    },
    ChefsSelectoptions(callback) {
        db.query('SELECT name,id FROM chefs', function(err, results) {
            if (err) throw 'data base error'
            callback(results.rows)
        })
    }
}