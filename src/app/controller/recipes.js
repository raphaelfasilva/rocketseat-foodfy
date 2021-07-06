const data = require('../../../data')
const fs = require("fs")
const recipe = require('../models/recipe')
module.exports = {
    index(req, res) {
        recipe.all(function(recipes) {
            res.render("admin/recipes/index", { itemsreceitas: recipes })
        })

    },
    show(req, res) {
        const { id } = req.params
        recipe.find(id, function(recipe) {
            if (!recipe) {
                res.status(404).render("admin/not-found");
            } else {
                return res.render("admin/recipes/recipe", { recipe });
            }
        })

    },
    create(req, res) {
        recipe.ChefsSelectoptions(function(chefsOptions) {
            res.render("admin/recipes/create.njk", { chefsOptions })
        })

    },
    edit(req, res) {
        const { id } = req.params
        recipe.find(id, function(recipe) {
            if (!recipe) {
                res.status(404).render("admin/not-found");
            } else {
                return res.render("admin/recipes/edit", { recipe })
            }

        })
    },
    post(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("por favor validar todos os campos")
            }
        }
        recipe.create(req.body, function(recipe) {
            return res.redirect(`/admin/recipes/${recipe.id}`)
        })
    },
    put(req, res) {
        const { id } = req.body
        recipe.update(req.body, function() {
            return res.redirect(`/admin/recipes/${id}`)
        })
    },
    delete(req, res) {
        const { id } = req.body
        recipe.delete(id, function() {
            return res.redirect(`/admin/recipes`)
        })
    },
    notfound(req, res) {
        res.status(404).render("not-found");
    }
}