const mongoose = require('mongoose');

const PricingSchema = mongoose.Schema({
   
  offrebasique : String,
  prixbasique : String,
  descriptionbasique : String,
  offrestandard : String,
  prixstandard : String,
  descriptionstandard : String,
  offrepremium : String,
  prixpremium : String,
  descriptionpremium : String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Pricing', PricingSchema);