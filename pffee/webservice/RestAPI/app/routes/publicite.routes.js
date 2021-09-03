module.exports = (app) => {
    const publicites = require('../controllers/publicite.controllers.js');

    // Create a new user
    app.post('/publicites', publicites.create);

    // Retrieve all users
    app.get('/publicites', publicites.findAll);

    // Retrieve a single user with usersId
    app.get('/publicites/:publiciteId', publicites.findOne);

    // Update a users with usersId
    app.put('/publicites/:publiciteId', publicites.update);

    // Delete a users with userId
    app.delete('/publicites/:publiciteId', publicites.delete); 
}
