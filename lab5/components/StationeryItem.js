import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function StationeryItem({ note, onToggle, onDelete, onAddToCart, inCart }) {
    return (
        <View style={[styles.item, note.done && styles.itemDone]}>
            {/* Чекбокс перемикання наявності/виконання */}
            <TouchableOpacity
                style={styles.textArea}
                onPress={() => onToggle(note.id)}
                activeOpacity={0.7}
            >
                <Text style={[styles.text, note.done && styles.textDone]}>
                    {note.done ? "☑️ " : "⬜ "}
                    {note.icon ? `${note.icon} ` : ""}
                    {note.text}
                </Text>
            </TouchableOpacity>

            <Text style={styles.priceTag}>{note.price} грн</Text>

            {/* Кнопка "У кошик" */}
            <TouchableOpacity
                style={[styles.cartButton, inCart && styles.cartButtonAdded]}
                onPress={() => onAddToCart(note)}
            >
                <Text style={styles.cartButtonText}>
                    {inCart ? "В кошику" : "У кошик"}
                </Text>
            </TouchableOpacity>

            {/* Кнопка "Видалити" */}
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onDelete(note.id)}
            >
                <Text style={styles.deleteButtonText}>Видалити</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#d1fae5",
        padding: 10,
        borderRadius: 10,
        marginBottom: 8,
        gap: 8,
    },
    itemDone: {
        backgroundColor: "#f1f5f9",
    },
    textArea: {
        flex: 1,
    },
    text: {
        fontSize: 15,
        color: "#0f172a",
        fontWeight: "500",
    },
    textDone: {
        color: "#94a3b8",
        textDecorationLine: "line-through",
    },
    priceTag: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#059669",
        marginRight: 4,
    },
    cartButton: {
        backgroundColor: "#0284c7",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    cartButtonAdded: {
        backgroundColor: "#64748b",
    },
    cartButtonText: {
        color: "#ffffff",
        fontSize: 12,
        fontWeight: "bold",
    },
    deleteButton: {
        backgroundColor: "#ef4444",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    deleteButtonText: {
        color: "#ffffff",
        fontSize: 12,
        fontWeight: "bold",
    },
});