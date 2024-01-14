const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const { success, getUniqueId } = require('./helper');
let pokemons = require('./mock-pokemon');
const PokemonModel = require('./src/models/pokemon')

const app = express();
const port = 3000;

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

sequelize.authenticate()
    .then(_ => console.log(`La connexion à la base de données à bien été établie`))
    .catch(err => console.error(`Impossible de se connecter à la base de donnée ${err}`))

const Pokemon = PokemonModel(sequelize, DataTypes);
sequelize.sync({ force: true })
    .then(_ => {
        console.log(`La base de donnée Pokédex a bien été synchronisée.`);

        pokemons.map(pokemon => {
            Pokemon.create({
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                types: pokemon.types.join()
            }).then(bulbizarre => console.log(bulbizarre.toJSON()))
        })

    })

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json());

app.get('/', (req, res) => res.send("Hello again, express !"));

app.get('/api/pokemons', (req, res) => {
    // res.send(`Il y a ${pokemons.length} dans le pokédex, pour le moment.`);
    const message = "Recupération du pokédex complet";
    res.json(success(message, pokemons))
});

app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(pokemon => pokemon.id === id);
    const message = "Un pokemon a bien été trouvé";
    res.json(success(message, pokemon));
});

app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons);
    const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
    pokemons.push(pokemonCreated)
    const message = `Le pokémon ${pokemonCreated.name} a bien été crée`;
    res.json(success(message, pokemonCreated));
})

app.put('/api/pokemons/:id', (req, res) => {
    const pokemonId = parseInt(req.params.id);
    const pokemonUpdated = { ...req.body, id: pokemonId };
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === pokemonId ? pokemonUpdated : pokemon;
    });
    const message = `Le pokemon ${pokemonUpdated.name} a bien été modifié`;
    res.json(success(message, pokemonUpdated));
})

app.delete('/api/pokemons/:id', (req, res) => {
    const pokemonId = parseInt(req.params.id);
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === pokemonId);
    pokemons = pokemons.filter(pokemon => pokemon.id !== pokemonId);
    const message = `Le pokemon ${pokemonDeleted.name} a bien été supprimé.`
    res.json(success(message, pokemonDeleted));
})

app.listen(port, () => console.log(`Notre application Node démarre sur : http://localhost:${port}`));