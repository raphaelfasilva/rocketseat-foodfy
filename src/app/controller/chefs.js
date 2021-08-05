const chef = require('../models/chef')
module.exports = {
    index(req, res) {
        let { filter } = req.query
        if (filter) {
            chef.findBy(filter, function(chefs) {
                return res.render("admin/chefs/index", { itemschefs: chefs, filter })
            })
        } else {
            chef.all(function(chefs) {
                return res.render("admin/chefs/index", { itemschefs: chefs })
            })
        }

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
        chef.recipeschefList(id, function(recipes) {
            chef.find(id, function(chef) {
                if (!chef) return res.send("chef não encontrado")
                return res.render("admin/chefs/chef", { chef, itemsreceitas: recipes })
            })
        })

    },
    edit(req, res) {
        const { id } = req.params
        chef.find(id, function(chef) {
            if (!chef) return res.send("chef não encontrado")
            return res.render("admin/chefs/edit", { chef })
        })
    },
    put(req, res) {
        const { id } = req.body
        chef.update(req.body, function() {
            return res.redirect(`/admin/chefs/${id}`)
        })
    },
    delete(req, res) {
        const { id } = req.body
        chef.delete(id, function() {
            return res.redirect(`/admin/chefs`)
        })
    },

}