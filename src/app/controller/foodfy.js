const recipe = require('../models/recipe')
const chef = require('../models/chef')

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
        const { filter } = req.query
        recipe.findBy(filter, function(recipes) {
            return res.render("foodfy/search", { itemsreceitas: recipes, filter })
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

    },
    async chefs(req, res) {
        try {
            const results = await chef.all()
            const chefs = results.rows
            return res.render("foodfy/chefs", { itemschefs: chefs })
        } catch (error) {
            console.log(error)
        }
    }
}