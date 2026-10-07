export function validateNote(req, res, next) {
    const { title, content } = req.body;

    if (!title || !title.trim() || !content || !content.trim()) {
        return res.status(400).json({
            message: "Поля title та content є обов'язковими і не можуть бути порожніми.",
        });
    }

    next();
}