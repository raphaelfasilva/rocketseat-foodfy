const data = require('../../../data')
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
    recipes(req, res) {
        recipe.all(function(recipes) {
            return res.render("foodfy/recipes", { itemsreceitas: recipes })
        })
    },
    show(req, res) {
        const recipeIndex = req.params.id - 1;
        receita = data.recipes[recipeIndex];
        if (!receita) {
            res.status(404).render("not-found");
        } else {
            return res.render("foodfy/recipe", { receita });
        }
    }
}