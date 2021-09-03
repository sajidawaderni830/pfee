const Publicite = require('../models/publicite.model.js');

// Créer et enregistrer une nouvelle publicité
exports.create = (req, res) => {
  // Valider la requete
    if(!req.body.prix) {
        return res.status(400).send({
            message: "le contenu de la publicité ne peut pas être vide"
        });
    }

     // Creation d'une publicité
    const publicite = new Publicite({
        
        prix : req.body.prix|| "Untitled publicité", 
       imagepublicite : req.body.imagepublicite,
       l_fb : req.body.l_fb,
       l_insta : req.body.l_insta,
       activite : req.body.activite,
       date_publicite : req.body.date_publicite,
       nompartenaire: req.body.nompartenaire,
       periode : req.body.periode,
       idpartenaire: req.body.idpartenaire ,
       etat:req.body.etat 
    });

     // enregistrer la publicité dans la BD
    publicite.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur s'est produite lors de la création."
        });
    });
};

// Récupérer et renvoyer tous les publicités de la base de données.
exports.findAll = (req, res) => {
    Publicite.find()
    .then(publicites => {
        res.send(publicites);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur s'est produite lors de la récupération des publicités."
        });
    });
};

// Trouver une publicité unique avec un publiciteId
exports.findOne = (req, res) => {
    Publicite.findById(req.params.publiciteId)
    .then(publicite => {
        if(!publicite) {
            return res.status(404).send({
                message: "Publicité introuvable avec l'identifiant 1" + req.params.publiciteId
            });            
        }
        res.send(publicite);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Publicité introuvable avec l'identifiant 2 " + req.params.publiciteId
            });                
        }
        return res.status(500).send({
            message: "Erreur lors de la récupération de la publicité avec l'ID " + req.params.publiciteId
        });
    });
};

// Mettre à jour une note identifiée par le noteId dans la requete
exports.update = (req, res) => {
    // Validate Request


    // Trouvez l'offre et mettez-le à jour avec le corps de la requete
    Publicite.findByIdAndUpdate(req.params.publiciteId, {
            
    
        etat:req.body.etat

        
    }, {new: true})
    .then(publicite => {
        if(!publicite) {
            return res.status(404).send({
                message: "Publicité introuvable avec l'identifiant " + req.params.publiciteId
            });
        }
        res.send(publicite);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Publicité introuvable avec l'identifiant " + req.params.publiciteId
            });                
        }
        return res.status(500).send({
            message: "Erreur lors de la récupération de la publicité avec l'ID " + req.params.publiciteId
        });
    });
};

// Supprimer une demande avec le noteId spécifié dans la requete
exports.delete = (req, res) => {
    Publicite.findByIdAndRemove(req.params.publiciteId)
    .then(publicite => {
        if(!publicite) {
            return res.status(404).send({
                message: "Publicité introuvable avec l'identifiant " + req.params.publiciteId
            });
        }
        res.send({message: "Offre supprimé avec succès!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.prix === 'NotFound') {
            return res.status(404).send({
                message: "Publicité introuvable avec l'identifiant " + req.params.publiciteId
            });                
        }
        return res.status(500).send({
            message: "Impossible de supprimer la publicité avec l'ID  " + req.params.publiciteId
        });
    });
};
