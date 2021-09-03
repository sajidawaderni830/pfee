const Partenaire = require('../models/partenaire.model.js');

exports.getpartenaire = async (req, res, next) => {
    try {
      const partenaires = await Partenaire.find();
  
      return res.status(200).json({
        success: true,
        count: partenaires.length,
        data: partenaires
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };


// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    // Create a user
    const partenaire = new Partenaire({
        email: req.body.email || "Untitled User", 
        mot_de_passe : req.body.mot_de_passe,
        nom : req.body.nom,
        telephone :req.body.telephone, 
        storeId : req.body.storeId,
        adress : req.body.adress,
       matricule_fisquale : req.body.matricule_fisquale,
       type_activite: req.body.type_activite,
       lien_insta : req.body.lien_insta,
       lien_fb : req.body.lien_fb
      
    });

    // Save user in the database
    partenaire.save()
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
    Partenaire.find()
    .then(partenaires => {
        res.send(partenaires);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    Partenaire.findById(req.params.partenaireId)
    .then(partenaire => {
        if(!partenaire) {
            return res.status(404).send({
                message: "user not found with id " + req.params.partenaireId
            });            
        }
        res.send(partenaire);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.partenaireId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.partenaireId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.email) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    // Find user and update it with the request body
    Partenaire.findByIdAndUpdate(req.params.partenaireId, {
        email: req.body.email || "Untitled user",
         
        mot_de_passe : req.body.mot_de_passe,
        nom : req.body.nom,
        telephone :req.body.telephone,
        adress : req.body.adress,
       matricule_fisquale : req.body.matricule_fisquale,
       type_activite: req.body.type_activite,
       lien_insta : req.body.lien_insta,
       lien_fb : req.body.lien_fb
        
    }, {new: true})
    .then(partenaire => {
        if(!partenaire) {
            return res.status(404).send({
                message: "user not found with id " + req.params.partenaireId
            });
        }
        res.send(partenaire);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.partenaireId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.partenaireId
        });
    });
};

// Delete a user with the specified noteId in the request
exports.delete = (req, res) => {
    Partenaire.findByIdAndRemove(req.params.partenaireId)
    .then(partenaire => {
        if(!partenaire) {
            return res.status(404).send({
                message: "user not found with id " + req.params.partenaireId
            });
        }
        res.send({message: "user deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.email === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.params.partenaireId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.partenaireId
        });
    });
};
