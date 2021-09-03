module.exports = (app) => {
    const aviapps = require('../controllers/aviapp.controllers.js');

    // creation un nouvel avi
    app.post('/aviapps', aviapps.create);

    // Récupérer tous les avis
    app.get('/aviapps', aviapps.findAll);

    // Récupérer un seul avi avec avioffresId
    app.get('/aviapps/:aviappId', aviapps.findOne);

    // Mettre à jour un avi avec avioffresId
    app.put('/aviapps/:aviappId', aviapps.update);

    // Supprimer un avi avec avioffresIdd
    app.delete('/aviapps/:aviappId', aviapps.delete);
}
