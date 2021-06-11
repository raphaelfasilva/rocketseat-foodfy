const data = require('../../../data')
const fs = require("fs")
module.exports = {
    index(req, res) {
        res.render("admin/recipes/index", { itemsreceitas: data.recipes })
    },
    show(req, res) {
        const recipeIndex = req.params.id - 1;
        receita = data.recipes[recipeIndex];
        if (!receita) {
            res.status(404).render("admin/not-found");
        } else {
            return res.render("admin/recipes/recipe", { receita });
        }
    },
    create(req, res) {
        res.render("admin/recipes/create.njk")
    },
    edit(req, res) {
        const { id } = req.params
        const foundRecipes = data.recipes.find(function(recipes) {
            return recipes.id == id
        })
        if (!foundRecipes) {
            res.status(404).render("admin/not-found");
        }
        const recipe = {
            ...foundRecipes
        }

        return res.render("admin/recipes/edit", { recipe })
    },
    post(req, res) {
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
    },
    put(req, res) {
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

    },
    delete(req, res) {
        const { id } = req.body
        const filteredrecipes = data.recipes.filter(function(recipe) {
            return recipe.id != id
        })
        data.recipes = filteredrecipes
        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
            if (err) return res.send("erro gravar no arquivo")
            return res.redirect(`/admin/recipes`)
        })
    },
    notfound(req, res) {
        res.status(404).render("not-found");
    }
}