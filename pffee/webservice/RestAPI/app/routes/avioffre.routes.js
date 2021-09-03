module.exports = (app) => {
    const avioffres = require('../controllers/avioffre.controllers.js');

    // creation un nouvel avi
    app.post('/avioffres', avioffres.create);

    // Récupérer tous les avis
    app.get('/avioffres', avioffres.findAll);

    // Récupérer un seul avi avec avioffresId
    app.get('/avioffres/:avioffreId', avioffres.findOne);

    // Mettre à jour un avi avec avioffresId
    app.put('/avioffres/:avioffreId', avioffres.update);

    // Supprimer un avi avec avioffresIdd
    app.delete('/avioffres/:avioffreId', avioffres.delete);
}
