module.exports = (app) => {
    const clients = require('../controllers/client.controllers.js');

    // Create a new user
    app.post('/clients', clients.create);

    // Retrieve all users
    app.get('/clients', clients.findAll);

    // Retrieve a single user with usersId
    app.get('/clients/:clientId', clients.findOne);

    // Update a users with usersId
    app.put('/clients/:clientId', clients.update);

    // Delete a users with userId
    app.delete('/clients/:clientId', clients.delete);
}
