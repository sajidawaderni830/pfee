const Avioffre = require('../models/avioffre.model.js');

// Créer et enregistrer un nouvel avi
exports.create = (req, res) => {
    // Valider la requete
    if(!req.body.continue) {
        return res.status(400).send({
            message: "verifier votre commentaire :("
        });
    }

    // Creation d'un avi
    const avioffre = new Avioffre({
        continue : req.body.continue|| "Untitled avi", 
      
        idclient: req.body.idclient,
        nomclient : req.body.nomclient,
        prenomclient : req.body.prenomclient,
        date: req.body.date 
      
        
    });

    // enregistrer l'avi dans la BD
    avioffre.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur s'est produite lors de la création."
        });
    });
};

// Récupérer et renvoyer tous les avis de la base de données.
exports.findAll = (req, res) => {
    Avioffre.find()
    .then(avioffres => {
        res.send(avioffres);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur s'est produite lors de la récupération des avis."
        });
    });
};

// Trouver un avi unique avec un avioffreId
exports.findOne = (req, res) => {
    Avioffre.findById(req.params.avioffreId)
    .then(avioffre => {
        if(!avioffre) {
            return res.status(404).send({
                message: "avi introuvable avec l'identifiant " + req.params.avioffreId
            });            
        }
        res.send(avioffre);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "avi introuvable avec l'identifiant " + req.params.avioffreId
            });                
        }
        return res.status(500).send({
            message: "Erreur lors de la récupération de l'avi avec l'ID " + req.params.avioffreId
        });
    });
};

// Mettre à jour une note identifiée par le noteId dans la requete
exports.update = (req, res) => {
    // Valider la requete
    if(!req.body.continue) {
        return res.status(400).send({
            message: "le contenu avi ne peut pas être vide"
        });
    }

    // Trouvez l'avi et mettez-le à jour avec le corps de la requete
    Avioffre.findByIdAndUpdate(req.params.avioffreId, {
        continue : req.body.continue|| "Untitled avi", 
        idclient: req.body.idclient,
        nomclient : req.body.nomclient,
        prenomclient : req.body.prenomclient,
        date : req.body.date
      
    }, {new: true})
    .then(avioffre => {
        if(!avioffre) {
            return res.status(404).send({
                message: "avi introuvable avec l'identifiant " + req.params.avioffreId
            });
        }
        res.send(avioffre);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "avi introuvable avec l'identifiant " + req.params.avioffreId
            });                
        }
        return res.status(500).send({
            message: "Erreur lors de la récupération de l'avi avec l'ID " + req.params.avioffreId
        });
    });
};

// Supprimer un advi avec le noteId spécifié dans la requete
exports.delete = (req, res) => {
    Avioffre.findByIdAndRemove(req.params.avioffreId)
    .then(avioffre => {
        if(!avioffre) {
            return res.status(404).send({
                message: "avi introuvable avec l'identifiant " + req.params.avioffreId
            });
        }
        res.send({message: "avi supprimé avec succès!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.continue === 'NotFound') {
            return res.status(404).send({
                message: "avi introuvable avec l'identifiant " + req.params.avioffreId
            });                
        }
        return res.status(500).send({
            message: "Impossible de supprimer l'avi avec l'ID " + req.params.avioffreId
        });
    });
};
