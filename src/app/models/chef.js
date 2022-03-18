const db = require('../../config/db')
const { date, age } = require('../../lib/util')
module.exports = {
    all() {
        return db.query(`SELECT chefs.*,count(recipes) AS total_recipes
        from chefs
        LEFT JOIN recipes on (chefs.id = recipes.chef_id) GROUP BY chefs.id `)
    },
    create(data) {
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
        return db.query(query, values)
    },
    find(id) {
        return db.query(`SELECT chefs.*,count(recipes) AS total_recipes
        from chefs
        LEFT JOIN recipes on (chefs.id = recipes.chef_id) where chefs.id = $1 GROUP BY chefs.id `, [id])
    },
    update(data, callback) {
        const query = `
        update chefs SET 
        name=($1),
        avatar_url=($2)
        where id=$3
     `
        const values = [
            data.name,
            data.avatar_url,
            data.id
        ]
        db.query(query, values, function(err, res) {
            if (err) throw "data base error"
            callback()
        })

    },
    delete(id, callback) {
        db.query(`DELETE FROM chefs where id = $1`, [id], function() {
            callback()
        })
    },
    recipeschefList(id) {
        return db.query(`SELECT recipes.*,chefs.name AS author
        from recipes 
        LEFT JOIN chefs on (recipes.chef_id = chefs.id) where recipes.chef_id = $1`, [id])
    }

}