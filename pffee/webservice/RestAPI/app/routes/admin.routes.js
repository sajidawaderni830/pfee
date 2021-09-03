module.exports = (app) => {
    const admins = require('../controllers/admin.controllers.js');

    // Create a new admin
    app.post('/admins', admins.create);

    // Retrieve all admins
    app.get('/admins', admins.findAll);

    // Retrieve a single admin with adminsId
    app.get('/admins/:adminId', admins.findOne);

    // Update a admins with adminsId
    app.put('/admins/:adminId', admins.update);

    // Delete a admins with adminId
    app.delete('/admins/:adminId', admins.delete);
} 
