const { Pokemon } = require('../db/sequelize');

module.exports = (app) => {
    app.get('/api/pokemons/:id', (req, res) => {
        Pokemon.findByPk(req.params.id)
            .then(pokemon => {
                if (pokemon === null) {
                    const message = "Le pokemon demandée n'existe pas. Réessayez avec un autre identifiant."
                    return res.status(404).json({ message })
                }

                const message = `Un pokemon a bien été récupéré.`
                res.json({ message, data: pokemon })
            })
            .catch(err => {
                const message = "Le pokémon n'a pas pu être récupérée. Réessayez dans quelques instants.";
                res.status(500).json({ message, data: err })
            })
    })
}