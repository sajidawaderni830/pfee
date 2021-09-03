const mongoose = require('mongoose');

const DemandeoffreSchema = mongoose.Schema({
   
  idpartenaire: String,
   
    imagedemandeoffre :{
      type: String,
      required: [true, "L'image est obligatoire !"]
    },   
    description :{
      type: String,
      required: [true, "Description est obligatoire !"]
    },
    periode : String,
    idpricing : String,
    prix : String,
    idpartenaire : String,
    nompartenaire : String,
    l_fb : String,
    l_insta : String,
    activite : String,
    date_demandeoffre :{
      type: Date,
      required: [true, "Date est obligatoire !"]
    },   
    etat : String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Demandeoffre', DemandeoffreSchema); 