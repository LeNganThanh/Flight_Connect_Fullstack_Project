import mongoose from "mongoose";

const Schema = mongoose.Schema;

const flightSchema = new Schema({
  totalPrice: { type: Number, required: true },
});

const FlightsCollection = mongoose.model("flights", flightSchema);

export default FlightsCollection;
