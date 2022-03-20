const recipe = require('../models/recipe')
const chef = require('../models/chef')

module.exports = {
    about(req, res) {
        return res.render("foodfy/about")
    },
    async index(req, res) {
        let recipes = null
        try {
            const results = await recipe.all()
            recipes = results.rows
        } catch (error) {
            console.log(error)
        }
        res.render("foodfy/index", { itemsreceitas: recipes })
    },
    async search(req, res) {
        const { filter } = req.query
        let recipes = null
        try {
            const results = await recipe.findBy(filter)
            recipes = results.rows
        } catch (error) {
            console.log(error)
        }
        return res.render("foodfy/search", { itemsreceitas: recipes, filter })
    },
    async recipes(req, res) {
        let recipes = null
        try {
            const results = await recipe.all()
            recipes = results.rows
        } catch (error) {
            console.log(error)
        }
        res.render("foodfy/recipes", { itemsreceitas: recipes })
    },
    async show(req, res) {
        const id = req.params.id
        let reciperesult = null
        try {
            const results = await recipe.find(id)
            reciperesult = results.rows[0]
        } catch (error) {
            console.log(error)
        }
        if (reciperesult) {
            return res.render("foodfy/recipe", { receita: reciperesult });
        } else {
            return res.status(404).render("not-found");
        }
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