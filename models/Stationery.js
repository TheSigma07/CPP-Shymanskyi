import mongoose from "mongoose";

const stationerySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        inStock: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Stationery = mongoose.model("Stationery", stationerySchema);

export default Stationery;
