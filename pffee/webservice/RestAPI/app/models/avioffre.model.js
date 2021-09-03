const mongoose = require('mongoose');

const AvioffreSchema = mongoose.Schema({
   
  idclient: String,
   
    idoffre : String,
    continue : String,
    nomclient : String,
    prenomclient : String,
   
    
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Avioffre', AvioffreSchema);