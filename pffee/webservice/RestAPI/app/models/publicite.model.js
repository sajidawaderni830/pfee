const mongoose = require('mongoose');
const PubliciteSchema = mongoose.Schema({
   
  idpartenaire: String,

  imagepublicite :{
    type: String,
    required: [true, "L'image est obligatoire !"]
  },   
    periode :{
      type: String,
      required: [true, "Periode est obligatoire !"]
    },   
    prix :{
      type: String,
      required: [true, "Prix est obligatoire !"]
    },   
    nompartenaire : String,
    l_fb : String,
    l_insta : String,
    activite : String,
    date_publicite :{
      type: Date,
      required: [true, "Date est obligatoire !"]
    },
    etat : String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Publicite', PubliciteSchema); 