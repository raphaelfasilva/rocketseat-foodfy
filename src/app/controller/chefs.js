const chef = require('../models/chef')
module.exports = {
    index(req, res) {
        return res.render("admin/chefs/index")
    },
    create(req, res) {
        return res.render("admin/chefs/create")
    },
    post(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("por favor validar todos os campos")
            }
        }
        chef.create(req.body, function(chef) {
            return res.redirect(`/admin/chefs/${chef.id}`)
        })

    }
}