const mongoose = require('mongoose');
const validator = (v)=> {
    return v.length == 8;
};
const AdminSchema = mongoose.Schema({
    name: {type: String, 
        lowercase: true, 
        required: [true, "Le nom est obligatoire"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid']
        },
    password: String,
   
    email :{
        type: String,
        unique: [true, "L'email doit être  unique ! "],
        required: [true, "L'email est obligatoire !"]
}, 
    telephone : {
        type: String,
        validate: [
            validator,
            'Le numero du téléphone doit être composé de 8 chiffres !' ],
        required: [true, 'Le numéro de téléphone est obligatoire !'],
        unique: [true, 'Le numéro de téléphone doit être unique !']
    },
     adresse: String,
   
}, {
    timestamps: true
});

module.exports = mongoose.model('Admin', AdminSchema);