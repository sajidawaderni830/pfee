const Demandeoffre = require('../models/demandeoffre.model.js');

// Créer et enregistrer une nouvelle demande
exports.create = (req, res) => {
   // Valider la requete
    if(!req.body.periode) {
        return res.status(400).send({
            message: "le contenu de demande ne peut pas être vide"
        });
    }

   // Creation d'une demande
    const demandeoffre = new Demandeoffre({
        
        periode : req.body.periode || "Untitled demande", 
       imagedemandeoffre : req.body.imagedemandeoffre,
       description : req.body.description,
       idpartenaire: req.body.idpartenaire  ,
       idpricing : req.body.idpricing,
       prix : req.body.prix,
       nompartenaire: req.body.nompartenaire,
       l_fb : req.body.l_fb,
       l_insta : req.body.l_insta,
       activite : req.body.activite,
       date_demandeoffre : req.body.date_demandeoffre,
       etat : req.body.etat
       
    });

     // enregistrer la demande dans la BD
    demandeoffre.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur s'est produite lors de la création."
        });
    });
};

// Récupérer et renvoyer tous les demandes de la base de données.
exports.findAll = (req, res) => {
    Demandeoffre.find()
    .then(demandeoffres => {
        res.send(demandeoffres);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur s'est produite lors de la récupération des demandes."
        });
    });
};

// Trouver une demande unique avec un demandeoffreId
exports.findOne = (req, res) => {
    Demandeoffre.findById(req.params.demandeoffreId)
    .then(demandeoffre => {
        if(!demandeoffre) {
            return res.status(404).send({
                message: "demande introuvable avec l'identifiant " + req.params.demandeoffreId
            });            
        }
        res.send(demandeoffre);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "demande introuvable avec l'identifiant " + req.params.demandeoffreId
            });                
        }
        return res.status(500).send({
            message: "Erreur lors de la récupération de la demande avec l'ID " + req.params.demandeoffreId
        });
    });
};

// Mettre à jour une note identifiée par le noteId dans la requete
exports.update = (req, res) => {
    

    // Trouvez la demande et mettez-le à jour avec le corps de la requete
    Demandeoffre.findByIdAndUpdate(req.params.demandeoffreId, {
        etat : req.body.etat
        
    }, {new: true})
    .then(demandeoffre => {
        if(!demandeoffre) {
            return res.status(404).send({
                message: "demande introuvable avec l'identifiant " + req.params.demandeoffreId
            });
        }
        res.send(demandeoffre);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "demande introuvable avec l'identifiant " + req.params.demandeoffreId
            });                
        }
        return res.status(500).send({
            message: "Erreur lors de la récupération de la demande avec l'ID " + req.params.demandeoffreId
        });
    });
};

// Supprimer une demande avec le noteId spécifié dans la requete
exports.delete = (req, res) => {
    Demandeoffre.findByIdAndRemove(req.params.demandeoffreId)
    .then(demandeoffre => {
        if(!demandeoffre) {
            return res.status(404).send({
                message: "demande introuvable avec l'identifiant " + req.params.demandeoffreId
            });
        }
        res.send({message: "demande supprimé avec succès!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.periode === 'NotFound') {
            return res.status(404).send({
                message: "demande introuvable avec l'identifiant " + req.params.demandeoffreId
            });                
        }
        return res.status(500).send({
            message: "Impossible de supprimer la demande avec l'ID " + req.params.demandeoffreId
        });
    }); 
};
