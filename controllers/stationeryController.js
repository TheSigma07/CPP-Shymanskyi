import Note from "../models/Note.js";

export async function getNotes(req, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Нотатку не знайдено" });
        }

        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const note = await Note.create({ title, content });
        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const note = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true, runValidators: true }
        );

        if (!note) {
            return res.status(404).json({ message: "Нотатку не знайдено" });
        }

        res.json(note);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function deleteNote(req, res) {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Нотатку не знайдено" });
        }

        res.json({ message: "Нотатку видалено" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}