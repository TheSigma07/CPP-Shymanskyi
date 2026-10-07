import Stationery from "../models/Stationery.js";

export async function getStationery(req, res) {
    try {
        const items = await Stationery.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getStationeryById(req, res) {
    try {
        const item = await Stationery.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: "Канцтовар не знайдено" });
        }

        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function createStationery(req, res) {
    try {
        const { name, category, price, inStock } = req.body;
        const item = await Stationery.create({ name, category, price, inStock });
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function updateStationery(req, res) {
    try {
        const { name, category, price, inStock } = req.body;
        const item = await Stationery.findByIdAndUpdate(
            req.params.id,
            { name, category, price, inStock },
            { new: true, runValidators: true }
        );

        if (!item) {
            return res.status(404).json({ message: "Канцтовар не знайдено" });
        }

        res.json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function deleteStationery(req, res) {
    try {
        const item = await Stationery.findByIdAndDelete(req.params.id);

        if (!item) {
            return res.status(404).json({message: "Канцтовар не знайдено"});
        }

        res.json({message: "Канцтовар успішно видалено"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
