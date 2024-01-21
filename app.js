const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json())
    .use(cors)

sequelize.initDB();

app.get('/', (req, res) => {
    res.json('Hello Render');
})

// Here, endpoints
// POKEMON ROUTES
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)

// USER ROUTES
require('./src/routes/login')(app)


// Handle 404 error
app.use(({ res }) => {
    const message = 'Impossible de retrouver la ressource demandée. Essayez une autre URL';
    res.status(404).json({ message })
});

app.listen(port, () => console.log(`Notre application Node démarre sur : http://localhost:${port}`));