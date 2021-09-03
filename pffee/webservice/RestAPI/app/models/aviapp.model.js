const mongoose = require('mongoose');

const AviappSchema = mongoose.Schema({
   
  idclient: String,
   
  nomclient: String,
  prenomclient : String,
    continue : String,
    date : String,
    
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Aviapp', AviappSchema);