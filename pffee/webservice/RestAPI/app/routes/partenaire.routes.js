module.exports = (app) => {
    const partenaires = require('../controllers/partenaire.controllers.js');
     
   
    // Create a new user
    app.post('/partenaires', partenaires.create);

    // Retrieve all users
    app.get('/partenaires', partenaires.findAll);
    app.get('/partenaires', partenaires.getpartenaire);
    // Retrieve a single user with usersId
    app.get('/partenaires/:partenaireId', partenaires.findOne);

    // Update a users with usersId
    app.put('/partenaires/:partenaireId', partenaires.update);

    // Delete a users with userId
    app.delete('/partenaires/:partenaireId', partenaires.delete);
} 
