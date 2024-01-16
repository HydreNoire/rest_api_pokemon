const { Pokemon } = require('../db/sequelize');
const { Op } = require('sequelize');

module.exports = (app) => {
    app.get('/api/pokemons', (req, res) => {
        if (req.query.name) {
            const name = req.query.name;
            return Pokemon.findAll({
                where: {
                    name: { // 'name' est une propriété du modèle Pokemon
                        [Op.like]: `%${name}%` // 'name' est le critère de recherche
                    }
                },
                limit: 5
            })
                .then(pokemon => {
                    const message = `Il y a ${pokemon.length} pokémon(s) qui correspond à votre recherche de ${name}`;
                    res.json({ message, data: pokemon })
                })
        } else {
            Pokemon.findAll()
                .then(pokemons => {
                    const message = 'La liste des pokémons a bien été récupérée'
                    res.json({ message, data: pokemons })
                })
                .catch(err => {
                    const message = `La liste des pokémons n'a pas pu être récupérée. Réessayez dans quelques instants.`
                    res.status(500).json({ message, data: err })
                })
        }
    })
}