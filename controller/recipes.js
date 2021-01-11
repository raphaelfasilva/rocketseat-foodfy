const data = require('../data')
exports.about = function(req, res) {
    return res.render("recipes/about")
}
exports.index = function(req, res) {
    return res.render("recipes/index", { itemsreceitas: data.receitas })
}
exports.recipes = function(req, res) {
    return res.render("recipes/recipes", { itemsreceitas: data.receitas })
}
exports.show = function(req, res) {
    const recipeIndex = req.params.index - 1;
    receita = data.receitas[recipeIndex];
    if (!receita) {
        res.status(404).render("not-found");
    } else {
        return res.render("recipes/recipe", { receita });
    }
}