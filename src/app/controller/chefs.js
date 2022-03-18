const chef = require('../models/chef')
module.exports = {
    async index(req, res) {
        let { filter } = req.query
        if (filter) {
            try {
                const results = chef.findBy(filter)
                const chefs = results.rows
                return res.render("admin/chefs/index", { itemschefs: chefs, filter })
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const results = await chef.all()
                const chefs = results.rows
                return res.render("admin/chefs/index", { itemschefs: chefs })
            } catch (error) {
                console.log(error)
            }

        }

    },
    create(req, res) {
        return res.render("admin/chefs/create")
    },
    async post(req, res) {
        const keys = Object.keys(req.body)
        let chefid = null
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("por favor validar todos os campos")
            }
        }
        try {
            const results = await chef.create(req.body)
            chefid = results.rows[0].id
        } catch (error) {
            console.log(error)
        }
        return res.redirect(`/admin/chefs/${chefid}`)
    },
    async show(req, res) {
        const { id } = req.params
        let results = null
        let chefresult = null
        let recipes = null
        try {
            results = await chef.recipeschefList(id)
            recipes = results.rows
            results = await chef.find(id)
            chefresult = results.rows[0]
        } catch (error) {
            console.log(error)
        }
        return res.render("admin/chefs/chef", { chef: chefresult, itemsreceitas: recipes })

    },
    async edit(req, res) {
        const { id } = req.params
        try {
            const results = await chef.find(id)
            const chefresult = results.rows[0]
            return res.render("admin/chefs/edit", { chef: chefresult })
        } catch (error) {
            console.log(error)
        }
    },
    put(req, res) {
        const { id } = req.body
        chef.update(req.body, function() {
            return res.redirect(`/admin/chefs/${id}`)
        })
    },
    delete(req, res) {
        const { id } = req.body
        chef.delete(id, function() {
            return res.redirect(`/admin/chefs`)
        })
    },

}