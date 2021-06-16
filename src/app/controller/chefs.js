const chef = require('../models/chef')
module.exports = {
    index(req, res) {
        chef.all(function(chefs) {
            return res.render("admin/chefs/index", { itemschefs: chefs })
        })
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

    },
    show(req, res) {
        const { id } = req.params
        chef.find(id, function(chef) {
            if (!chef) return res.send("chef não encontrado")
            return res.render("admin/chefs/chef", { chef })
        })
    }
}