const { Sequelize, DataTypes } = require('sequelize');
const PokemonModel = require('../models/pokemon');
let pokemons = require('./mock-pokemon');

const sequelize = new Sequelize(
    'pokedex',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        },
        logging: false
    }
);

const Pokemon = PokemonModel(sequelize, DataTypes);

const initDB = () => {
    return sequelize.sync({ force: true })
        .then(_ => {
            pokemons.map(pokemon => {
                Pokemon.create({
                    name: pokemon.name,
                    hp: pokemon.hp,
                    cp: pokemon.cp,
                    picture: pokemon.picture,
                    types: pokemon.types
                })
                // .then(pokemon => console.log(pokemon.toJSON()))
            })
            console.log('La base de donnée à bien été initialisée')
        })
}

module.exports = {
    initDB, Pokemon
}