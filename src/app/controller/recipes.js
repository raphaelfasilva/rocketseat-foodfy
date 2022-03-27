 const recipe = require('../models/recipe')
 module.exports = {
     async index(req, res) {
         let recipes = null
         try {
             const results = await recipe.all()
             recipes = results.rows
         } catch (error) {
             console.log(error)
         }
         res.render("admin/recipes/index", { itemsreceitas: recipes })
     },
     async show(req, res) {
         const { id } = req.params
         let reciperesult = null
         try {
             const results = await recipe.find(id)
             reciperesult = results.rows[0]
         } catch (error) {
             console.log(error)
         }
         if (!reciperesult) {
             res.send("receita não encontrada")
         } else {
             return res.render("admin/recipes/recipe", { recipe: reciperesult });
         }

     },
     async create(req, res) {
         try {
             const results = await recipe.ChefsSelectoptions()
             let chefsOptions = results.rows
             return res.render("admin/recipes/create.njk", { chefsOptions })
         } catch (error) {
             console.log(error)
         }
     },
     async edit(req, res) {
         const { id } = req.params
         let resultsrecipe = null
         let chefsOptions = null
         try {
             const resultschefs = await recipe.ChefsSelectoptions()
             chefsOptions = resultschefs.rows
             const resultsrecipe = await recipe.find(id)
             reciperesult = resultsrecipe.rows[0]
         } catch (error) {
             console.log(error)
         }
         if (!reciperesult) {
             return res.send("receita não encontrado")
         } else {
             return res.render("admin/recipes/edit", { recipe: reciperesult, chefsOptions })
         }
     },
     async post(req, res) {
         const keys = Object.keys(req.body)
         let recipeid = null
         for (key of keys) {
             if (req.body[key] == "") {
                 return res.send("por favor validar todos os campos")
             }
         }
         try {
             const results = await recipe.create(req.body)
             recipeid = results.rows[0].id
         } catch (error) {
             console.log(error)
         }
         return res.redirect(`/admin/recipes/${recipeid}`)
     },
     async put(req, res) {
         const { id } = req.body
         try {
             await recipe.update(req.body)
             return res.redirect(`/admin/recipes/${id}`)
         } catch (error) {
             console.log(error)
         }
     },
     async delete(req, res) {
         const { id } = req.body
         try {
             await recipe.delete(id)
             return res.redirect(`/admin/recipes`)
         } catch (error) {
             console.log(error)
         }
     },
     notfound(req, res) {
         res.status(404).render("not-found");
     }
 }