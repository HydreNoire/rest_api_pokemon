const { Sequelize, DataTypes } = require('sequelize');
const PokemonModel = require('../models/pokemon');
let pokemons = require('./mock-pokemon');
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        },
        logging: false
    }
);

// const sequelize = new Sequelize(
//     'pokedex',
//     'root',
//     '',
//     {
//         host: 'localhost',
//         dialect: 'mariadb',
//         dialectOptions: {
//             timezone: 'Etc/GMT-2'
//         },
//         logging: false
//     }
// );

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDB = () => {
    return sequelize.sync({ force: true }).then(_ => {
        pokemons.map(pokemon => {
            Pokemon.create({
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                types: pokemon.types
            })//.then(pokemon => console.log(pokemon.toJSON()))
        })

        bcrypt.hash('pikachou', 10)
            .then(hash => User.create({ username: "pikachou", password: hash }))
            .then(user => console.log(user.toJSON()))

        console.log('La base de donnée à bien été initialisée')
    })
}

module.exports = {
    initDB, Pokemon, User
}