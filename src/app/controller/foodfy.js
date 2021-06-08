const data = require('../../../data')
exports.about = function(req, res) {
    return res.render("foodfy/about")
}
exports.index = function(req, res) {
    return res.render("foodfy/index", { itemsreceitas: data.recipes })
}
exports.recipes = function(req, res) {
    return res.render("foodfy/recipes", { itemsreceitas: data.recipes })
}
exports.show = function(req, res) {
    const recipeIndex = req.params.id - 1;
    receita = data.recipes[recipeIndex];
    if (!receita) {
        res.status(404).render("not-found");
    } else {
        return res.render("foodfy/recipe", { receita });
    }
}