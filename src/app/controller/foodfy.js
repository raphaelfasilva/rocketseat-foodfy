const recipe = require('../models/recipe')

module.exports = {
    about(req, res) {
        return res.render("foodfy/about")
    },
    index(req, res) {
        recipe.all(function(recipes) {
            return res.render("foodfy/index", { itemsreceitas: recipes })
        })

    },
    search(req, res) {
        const { filter } = req.params
        recipe.findBy(filter, function(recipes) {
            return res.render("foodfy/search", { itemsreceitas: recipes })
        })
    },
    recipes(req, res) {
        recipe.all(function(recipes) {
            return res.render("foodfy/recipes", { itemsreceitas: recipes })
        })
    },
    show(req, res) {
        const id = req.params.id
        recipe.find(id, function(recipe) {
            if (!recipe) {
                res.status(404).render("not-found");
            } else {
                return res.render("foodfy/recipe", { receita: recipe });
            }
        })

    }
}