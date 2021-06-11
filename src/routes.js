const express = require('express')
const routes = express.Router()
const foodfy = require("./app/controller/foodfy")
const recipes = require("./app/controller/recipes")
const chefs = require("./app/controller/chefs")
routes.get('/', foodfy.index)
routes.get('/sobre', foodfy.about)
routes.get('/receitas', foodfy.recipes)
routes.get('/receitas/:id', foodfy.show)
routes.get('/admin', function(req, res) {
    return res.redirect("/admin/recipes")

})
routes.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita
routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita
//routes.use(recipes.notfound);

routes.get("/admin/chefs", chefs.index);
module.exports = routes