const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.promise = Promise;

// Define airlaneSchema
const airlaneSchema = new Schema({
  departure: { type: String },
  arrival: { type: String },
  departAt: { type: Date },
  arriveAt: { type: Date }
});

// Create reference to User & export
const AirLane = mongoose.model("AirLane", airlaneSchema);
module.exports = AirLane;
