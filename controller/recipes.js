const data = require("../data")
exports.index = function(req, res) {
    res.render("admin/index", { itemsreceitas: data.recipes })
}
exports.show = function(req, res) {
    const recipeIndex = req.params.id - 1;
    receita = data.recipes[recipeIndex];
    if (!receita) {
        res.status(404).render("not-found");
    } else {
        return res.render("admin/recipe", { receita });
    }
}
exports.create = function(req, res) {
    res.render("admin/create.njk")
}
exports.edit = function(req, res) {
    const { id } = req.params
    const foundRecipes = data.recipes.find(function(recipes) {
        return recipes.id == id
    })
    if (!foundRecipes) {
        res.status(404).render("not-found");
    }
    const recipe = {
        ...foundRecipes
    }

    return res.render("admin/edit.njk", { recipe })
}