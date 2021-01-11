const express = require('express')
const routes = express.Router()
const recipes = require("./controller/recipes")
routes.get('/', recipes.index)
routes.get('/sobre', recipes.about)
routes.get('/receitas', recipes.recipes)
routes.get('/receitas/:index', recipes.show)

module.exports = routes