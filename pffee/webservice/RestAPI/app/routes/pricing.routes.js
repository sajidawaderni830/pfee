module.exports = (app) => {
    const pricings = require('../controllers/pricing.controllers.js');

    // Create a new user
    app.post('/pricings', pricings.create);

    // Retrieve all users
    app.get('/pricings', pricings.findAll);

    // Retrieve a single user with usersId
    app.get('/pricings/:pricingId', pricings.findOne);

    // Update a users with usersId
    app.put('/pricings/:pricingId', pricings.update);

    // Delete a users with userId
    app.delete('/pricings/:pricingId', pricings.delete);
}
