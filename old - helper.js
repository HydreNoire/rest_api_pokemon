exports.success = (message, data) => {
    return { message, data }
}

exports.getUniqueId = (pokemons) => {
    const pokemonsIds = pokemons.map(pokemon => pokemon.id);
    const maxId = pokemonsIds.reduce((a, b) => Math.max(a, b))
    const uniqueId = maxId + 1;

    return uniqueId;
}

// ENDPOINT FOR STATIC
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