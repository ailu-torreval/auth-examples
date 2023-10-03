const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TravelDestinationSchema = new Schema({
  country: {
    type: String,
    required: "country must be filled",
    minlength: 4,
  },
  title: { type: String, required: "title must be filled", minlength: 4 },
  link: { type: String, required: "link must be filled", minlength: 4 },
  arrivalDate: {
    type: String,
    required: "arrivalDate must be filled",
    minlength: 4,
  },
  departureDate: {
    type: String,
    required: "departureDate must be filled",
    minlength: 4,
  },
  image: {
    type: String,
    required: "image must be filled",
    minlength: 4,
  },
  description: { type: String, required: true, minlength: 4 },
},
{collection : 'destinations'});

// IF ITS ONLY ONE YOU CAN ALSO DO IT AS

module.exports = mongoose.model("TravelDestination", TravelDestinationSchema);
