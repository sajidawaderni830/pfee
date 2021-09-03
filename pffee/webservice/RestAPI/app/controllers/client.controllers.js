const Client = require('../models/client.model.js');

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request


    // Create a user
    const client = new Client({
        
        email: req.body.email , 
        mot_de_passe : req.body.mot_de_passe,
        telephone :req.body.telephone,
        adress : req.body.adress,
        nom : req.body.nom,
        prenom : req.body.prenom,
        date_naissance : req.body.date_naissance
    });

    // Save user in the database
    client.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur s'est produite lors de la création."
        });
    });
};

// Retrieve and return all user from the database.
exports.findAll = (req, res) => {
    Client.find()
    .then(clients => {
        res.send(clients);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur s'est produite lors de la récupération des clients."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    Client.findById(req.params.clientId)
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "client introuvable avec l'identifiant " + req.params.clientId
            });            
        }
        res.send(client);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "client introuvable avec l'identifiant " + req.params.clientId
            });                
        }
        return res.status(500).send({
            message: "Erreur lors de la récupération de client avec l'ID " + req.params.clientId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.email) {
        return res.status(400).send({
            message: "L'email est obligatoire !"
        });
    }

    // Find user and update it with the request body
    Client.findByIdAndUpdate(req.params.clientId, {
            
        email: req.body.email , 
        mot_de_passe : req.body.mot_de_passe,
        telephone :req.body.telephone,
        adress : req.body.adress,
        nom : req.body.nom,
        prenom : req.body.prenom,
        date_naissance : req.body.date_naissance
        
    }, {new: true})
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "client introuvable avec l'identifiant " + req.params.clientId
            });
        }
        res.send(client);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "client introuvable avec l'identifiant " + req.params.clientId
            });                
        }
        return res.status(500).send({
            message: "Erreur lors de la récupération de client avec l'ID  " + req.params.clientId
        });
    });
};

// Delete a user with the specified noteId in the request
exports.delete = (req, res) => {
    Client.findByIdAndRemove(req.params.clientId)
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "client introuvable avec l'identifiant " + req.params.clientId
            });
        }
        res.send({message: "Client supprimé avec succé!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.email === 'NotFound') {
            return res.status(404).send({
                message: "client introuvable avec l'identifiant " + req.params.clientId
            });                
        }
        return res.status(500).send({
            message: "Erreur lors de la récupération de client avec l'ID " + req.params.clientId
        });
    });
};
