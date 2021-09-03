const Admin = require('../models/admin.model.js');

// Create and Save a new admin
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "verifier votre email"
        });
    }

    // Create a admin
    const admin = new Admin({
        email: req.body.email || "Untitled admin", 
        password: req.body.password,
        name : req.body.name,
        telephone : req.body.telephone,
        adresse : req.body.adresse
        
    });  

    // Save admin in the database
    admin.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur s'est produite lors de la création. "
        });
    });
};

// Retrieve and return all admin from the database.
exports.findAll = (req, res) => {
    Admin.find()
    .then(admins => {
        res.send(admins);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur s'est produite lors de la récupération des admins."
        });
    });
};

// Find a single admin with a adminId
exports.findOne = (req, res) => {
    Admin.findById(req.params.adminId)
    .then(admin => {
        if(!admin) {
            return res.status(404).send({
                message: "admin introuvable avec l'identifiant " + req.params.adminId
            });            
        }
        res.send(admin);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "admin introuvable avec l'identifiant " + req.params.adminId
            });                
        }
        return res.status(500).send({
            message: "Erreur lors de la récupération de l'admin avec l'ID " + req.params.adminId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.email) {
        return res.status(400).send({
            message: "le contenu admin ne peut pas être vide"
        });
    }

    // Find admin and update it with the request body
    Admin.findByIdAndUpdate(req.params.adminId, {

        email: req.body.email || "Untitled admin", 
        password: req.body.password,
        name : req.body.name,
        telephone : req.body.telephone,
        adresse : req.body.adresse
        
    }, {new: true})
    .then(admin => {
        if(!admin) {
            return res.status(404).send({
                message: "admin introuvable avec l'identifiant " + req.params.adminId
            });
        }
        res.send(admin);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "admin introuvable avec l'identifiant " + req.params.adminId
            });                 
        }
        return res.status(500).send({
            message: "Erreur lors de la récupération de l'admin avec l'ID" + req.params.adminId
        });
    });
};

// Delete a admin with the specified noteId in the request
exports.delete = (req, res) => {
    Admin.findByIdAndRemove(req.params.adminId)
    .then(admin => {
        if(!admin) {
            return res.status(404).send({
                message: "admin introuvable avec l'identifiant " + req.params.adminId
            });
        }
        res.send({message: "admin deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "admin introuvable avec l'identifiant " + req.params.adminId
            });                
        }
        return res.status(500).send({
            message: "Erreur lors de la récupération de l'admin avec l'ID " + req.params.adminId
        });
    });
};
