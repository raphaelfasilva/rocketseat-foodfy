    const express = require('express')
    const routes = express.Router()
    const foodfy = require("./app/controller/foodfy")
    const recipes = require("./app/controller/recipes")
    const chefs = require("./app/controller/chefs")
    const multer = require('./middleware/multer')
    routes.get('/', foodfy.index)
    routes.get('/search', foodfy.search)
    routes.get('/sobre', foodfy.about)
    routes.get('/receitas', foodfy.recipes)
    routes.get('/receitas/:id', foodfy.show)
    routes.get('/admin', function(req, res) {
        return res.redirect("/admin/recipes")

    })
    routes.get('/chefs', foodfy.chefs)
    routes.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
    routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
    routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
    routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita
    routes.post("/admin/recipes", multer.array("photos", 6), recipes.post); // Cadastrar nova receita
    routes.put("/admin/recipes", multer.array("photos", 6), recipes.put); // Editar uma receita
    routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita
    routes.get("/admin/chefs", chefs.index);
    routes.get("/admin/chefs/create", chefs.create);
    routes.post("/admin/chefs", multer.array("photos", 6), chefs.post)
    routes.get("/admin/chefs/:id", chefs.show);
    routes.get("/admin/chefs/:id/edit", chefs.edit);
    routes.put("/admin/chefs", multer.array("photos", 6), chefs.put); // Editar uma receita
    routes.delete("/admin/chefs", chefs.delete); // Deletar uma receita
    module.exports = routes