const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const moment = require('moment');

// créer une application express
const app = express();
app.use(cors())

// application d'analyse/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// application d'analyse/json
app.use(bodyParser.json())

// Configuration de la base de données
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connexion à la base de données
mongoose.connect(dbConfig.url, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database"); 

}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});   
 

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Medicals Rest API."});
});
require('./app/routes/client.routes.js')(app);
require('./app/routes/partenaire.routes.js')(app);
require('./app/routes/admin.routes.js')(app);

require('./app/routes/publicite.routes.js')(app);
require('./app/routes/pricing.routes.js')(app);
require('./app/routes/avioffre.routes.js')(app);
require('./app/routes/aviapp.routes.js')(app);
require('./app/routes/demandeoffre.routes.js')(app);

// listen for requests
app.listen(3000, '192.168.43.47',    () => {
    console.log("Server is listening on port 3000");
});