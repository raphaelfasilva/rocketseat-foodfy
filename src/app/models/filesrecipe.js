const db = require('../../config/db')
module.exports = {
    create(data) {
        const query = `
        INSERT INTO files(
            name,
            path
        ) VALUES ($1,$2)
        RETURNING ID
        `
        data.price = data.price.replace(/\D/g, "")
        const values = [
            data.name,
            data.path
        ]
        return db.query(query, values)
    },
    delete(id) {
        return db.query(`DELETE FROM files WHERE id = $1`, [id])
    }
}