const db = require('../../config/db')
const { date, age } = require('../../lib/util')
module.exports = {
    all() {
        return db.query(`SELECT recipes.*,chefs.name AS author
        from recipes 
        LEFT JOIN chefs on (recipes.chef_id = chefs.id)
        order by title`)
    },
    create(data) {
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
            data.chef_id,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).iso
        ]
        return db.query(query, values)
    },
    find(id) {
        return db.query(`SELECT recipes.*,chefs.name AS author
        from recipes 
        LEFT JOIN chefs on (recipes.chef_id = chefs.id) where recipes.id = $1`, [id])
    },
    findBy(filter) {
        return db.query(`SELECT recipes.*,chefs.name AS author
        from recipes 
        LEFT JOIN chefs on (recipes.chef_id = chefs.id)
        where recipes.title ilike '%${filter}%' 
        order by name`)
    },
    update(data) {
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
        return db.query(query, values)
    },
    delete(id) {
        return db.query(`DELETE FROM recipes where id = $1`, [id])
    },
    ChefsSelectoptions() {
        return db.query('SELECT name,id FROM chefs')
    }
}