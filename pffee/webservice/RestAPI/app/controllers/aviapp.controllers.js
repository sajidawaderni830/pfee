const Aviapp = require('../models/aviapp.model.js');

// Créer et enregistrer un nouvel avi
exports.create = (req, res) => {
    // Valider la requete
    if(!req.body.continue) {
        return res.status(400).send({
            message: "verifier votre commentaire :("
        });
    }

    // Creation d'un avi 
    const aviapp = new Aviapp({
        continue : req.body.continue|| "Untitled avi", 
       
        idclient: req.body.idclient,
        nomclient : req.body.nomclient,
        prenomclient : req.body.prenomclient,
        date: req.body.date 
       
        
    });

    // enregistrer l'avi dans la BD
    aviapp.save()
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
    Aviapp.find()
    .then(aviapps => {
        res.send(aviapps);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur s'est produite lors de la récupération des avis."
        });
    });
};

// Trouver un avi unique avec un avioffreId
exports.findOne = (req, res) => {
    Aviapp.findById(req.params.aviappId)
    .then(aviapp => {
        if(!aviapp) {
            return res.status(404).send({
                message: "avi introuvable avec l'identifiant " + req.params.aviappId
            });            
        }
        res.send(aviapp);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "avi introuvable avec l'identifiant " + req.params.aviappId
            });                
        }
        return res.status(500).send({
            message: "Erreur lors de la récupération de l'avi avec l'ID " + req.params.aviappId
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
    Aviapp.findByIdAndUpdate(req.params.aviappId, {
        continue : req.body.continue|| "Untitled avi", 
        nomclient : req.body.nomclient,
        prenomclient : req.body.prenomclient,
        idclient: req.body.idclient,
        date : req.body.date      
      
    }, {new: true})
    .then(aviapp => {
        if(!aviapp) {
            return res.status(404).send({
                message: "avi introuvable avec l'identifiant " + req.params.aviappId
            });
        }
        res.send(aviapp);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "avi introuvable avec l'identifiant " + req.params.aviappId
            });                
        }
        return res.status(500).send({
            message: "Erreur lors de la récupération de l'avi avec l'ID " + req.params.aviappId
        });
    });
};

// Supprimer un advi avec le noteId spécifié dans la requete
exports.delete = (req, res) => {
    Aviapp.findByIdAndRemove(req.params.aviappId)
    .then(aviapp => {
        if(!aviapp) {
            return res.status(404).send({
                message: "avi introuvable avec l'identifiant " + req.params.aviappId
            });
        }
        res.send({message: "avi supprimé avec succès!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.continue === 'NotFound') {
            return res.status(404).send({
                message: "avi introuvable avec l'identifiant " + req.params.aviappId
            });                
        }
        return res.status(500).send({
            message: "Impossible de supprimer l'avi avec l'ID " + req.params.aviappId
        });
    });
};
