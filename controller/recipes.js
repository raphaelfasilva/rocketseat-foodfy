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