const data = require('../../../data')
const fs = require("fs")
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
exports.post = function(req, res) {
    const keys = Object.keys(req.body)
    const id = Number(data.recipes.length + 1)
    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("por favor validar todos os campos")
        }
    }
    const recipe = {
        id,
        ...req.body
    }
    data.recipes.push(recipe)
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("erro gravar no arquivo")
        return res.redirect(`/admin/recipes/${id}`)
    })
}
exports.put = function(req, res) {
    const { id } = req.body
    let index = 0
    const foundRecipes = data.recipes.find(function(recipe, foundIndex) {
        if (id == recipe.id) {
            index = foundIndex
            return true
        }
    })
    if (!foundRecipes) {
        res.send("instrutor não encontrado")
    }
    const recipe = {
        ...foundRecipes,
        ...req.body,
        id: Number(req.body.id)

    }
    data.recipes[index] = recipe
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("erro gravar no arquivo")
        return res.redirect(`/admin/recipes/${id}`)
    })

}
exports.delete = function(req, res) {
    const { id } = req.body
    const filteredrecipes = data.recipes.filter(function(recipe) {
        return recipe.id != id
    })
    data.recipes = filteredrecipes
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("erro gravar no arquivo")
        return res.redirect(`/admin/recipes`)
    })
}