const mongoose = require('mongoose');
const validator = (v)=> {
    return v.length == 8;
};
const ClientSchema = mongoose.Schema({
    email: {
        type: String, 
        lowercase: true, 
        required: [true, "L'email est obligatoire !"],
        match: [/\S+@\S+\.\S+/, 'is invalid'], 
        index: true
    },
        mot_de_passe : String,
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
        nom :{
            type: String,
            required: [true, "nom est obligatoire !"]
    }, 
        prenom :{
            type: String,
            required: [true, "prenom est obligatoire !"]
    }, 
        date_naissance : Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Client', ClientSchema);