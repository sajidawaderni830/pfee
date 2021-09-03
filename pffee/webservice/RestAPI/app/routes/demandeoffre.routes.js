module.exports = (app) => {
    const demandeoffres = require('../controllers/demandeoffre.controllers.js');

    // Create a new user
    app.post('/demandeoffres', demandeoffres.create);

    // Retrieve all users
    app.get('/demandeoffres', demandeoffres.findAll);

    // Retrieve a single user with usersId
    app.get('/demandeoffres/:demandeoffreId', demandeoffres.findOne);

    // Update a users with usersId
    app.put('/demandeoffres/:demandeoffreId', demandeoffres.update);

    // Delete a users with userId
    app.delete('/demandeoffres/:demandeoffreId', demandeoffres.delete);
}
