const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');


const PartenaireSchema = mongoose.Schema({
    email: {
        type: String, 
        required: [true, "L'email est obligatoire !"],
        match: [/\S+@\S+\.\S+/, 'is invalid'], 
        unique: [true, "L'email doit être unique !"]
    },
    nom :{
        type: String,
        required: [true, "Nom est obligatoire !"]
    }, 
    mot_de_passe :{
        type: String,
         required: [true, "Mot de passe est obligatoire !"]
        },
    telephone :{   
        type: Number,
        match: [/^\d{8}$/, 'is invalid'],
        required: [true, 'Le numéro de téléphone est obligatoire !'],
        unique: [true, 'Le numéro de téléphone doit être unique !']
    },    
    adress :{
        type: String,
        required: [true, "L'adresse est obligatoire !"]
    },
    matricule_fisquale :{
        type: String,
        required: [true, "Matricule est obligatoire !"],
        unique: [true, 'Le matricule doit être unique !']
    },
     type_activite:{
        type: String,
        required: [true, "Type est obligatoire !"]
    },
    lien_insta :{
        type: String,
        required: [true, "Lien instagram est obligatoire !"]
    },
    lien_fb :{
        type: String,
        required: [true, "Lien facebook est obligatoire !"]
    },
    storeId:{
        type: String,
        trim:true
      },
      location: {
        type: {
          type: String, 
          enum: ['Point']
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress: String
      }
}, {
    timestamps: true
});


// Geocode & create location
PartenaireSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.adress);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
      };
    
      // Do not save address
      this.adress = undefined;
      next();
    });

module.exports = mongoose.model('Partenaire', PartenaireSchema);