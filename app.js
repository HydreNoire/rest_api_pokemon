const express = require('express');
const { success } = require('./helper');
const pokemons = require('./mock-pokemon');

const app = express();
const port = 3000;

app.use((req, res, next) => {
    console.log(`URL : ${req.url}`);
    next();
});

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

app.listen(port, () => console.log(`Notre application Node démarre sur : http://localhost:${port}`));