export function validateStationery(req, res, next) {
    const { name, category, price } = req.body;

    if (!name || !name.trim() || !category || !category.trim() || price === undefined || price < 0) {
        return res.status(400).json({
            message: "Поля name, category та коректна price є обов'язковими.",
        });
    }

    next();
}
