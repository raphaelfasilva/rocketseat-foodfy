const express = require('express')
const nunjucks = require('nunjucks')
const receitas = require('./data')
const server = express()
server.use(express.static("public"))
server.set("view engine", "njk")
nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: false
})
server.get("/", function(req, res) {
    return res.render("home", { itemsreceitas: receitas })
})
server.get("/sobre", function(req, res) {
    return res.render("sobre")
})
server.get("/receitas", function(req, res) {
    return res.render("receitas", { itemsreceitas: receitas })
})
server.get("/receitas/:index", function(req, res) {
    const recipeIndex = req.params.index;
    receita = receitas[recipeIndex];
    if (!receita) {
        res.status(404).render("not-found");
    } else {
        return res.render("receita", { receita });
    }

})
server.use(function(req, res) {
    res.status(404).render("not-found");
});
server.listen(5000, function() {
    console.log("server is running")
})