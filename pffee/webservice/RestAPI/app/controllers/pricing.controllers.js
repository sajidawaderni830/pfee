const Pricing = require('../models/pricing.model.js');

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if(!req.body.offrebasique) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    // Create a user
    const pricing = new Pricing({
        
        offrebasique: req.body.offrebasique || "Untitled User", 
        prixbasique : req.body.prixbasique,
        descriptionbasique :req.body.descriptionbasique,
        offrestandard : req.body.offrestandard,
        prixstandard : req.body.prixstandard,
        descriptionstandard : req.body.descriptionstandard,
        offrepremium : req.body.offrepremium,
        prixpremium : req.body.prixpremium,
        descriptionpremium : req.body.descriptionpremium
    });

    // Save user in the database
    pricing.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
};

// Retrieve and return all user from the database.
exports.findAll = (req, res) => {
    Pricing.find()
    .then(pricings => {
        res.send(pricings);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    Pricing.findById(req.params.pricingId)
    .then(pricing => {
        if(!pricing) {
            return res.status(404).send({
                message: "user not found with id " + req.params.pricingId
            });            
        }
        res.send(pricing);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.pricingId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.pricingId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.offrebasique) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    // Find user and update it with the request body
    Pricing.findByIdAndUpdate(req.params.pricingId, {
            
         
        offrebasique: req.body.offrebasique || "Untitled User", 
        prixbasique : req.body.prixbasique,
        descriptionbasique :req.body.descriptionbasique,
        offrestandard : req.body.offrestandard,
        prixstandard : req.body.prixstandard,
        descriptionstandard : req.body.descriptionstandard,
        offrepremium : req.body.offrepremium,
        prixpremium : req.body.prixpremium,
        descriptionpremium : req.body.descriptionpremium
        
    }, {new: true})
    .then(pricing => {
        if(!pricing) {
            return res.status(404).send({
                message: "user not found with id " + req.params.pricingId
            });
        }
        res.send(pricing);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.prcingId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.pricingId
        });
    });
};

// Delete a user with the specified noteId in the request
exports.delete = (req, res) => {
    Pricing.findByIdAndRemove(req.params.pricingId)
    .then(pricing => {
        if(!pricing) {
            return res.status(404).send({
                message: "user not found with id " + req.params.pricingId
            });
        }
        res.send({message: "user deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.offrebasique === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.params.pricingId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.pricingId
        });
    });
};
