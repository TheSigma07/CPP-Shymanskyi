import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function StationeryList({
                                           notes,
                                           filter,
                                           setFilter,
                                           onToggle,
                                           onDelete,
                                           cart = [],
                                           onAddToCart,
                                       }) {
    // Фільтрація товарів (тільки "all" або "active")
    const filteredNotes = notes.filter((item) => {
        if (filter === "active") return !item.done;
        return true; // "all"
    });

    return (
        <View style={styles.container}>
            {/* Дві кнопки фільтрів замість трьох */}
            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={[styles.filterBtn, filter === "all" && styles.filterBtnActive]}
                    onPress={() => setFilter("all")}
                >
                    <Text style={[styles.filterText, filter === "all" && styles.filterTextActive]}>
                        Усі
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.filterBtn, filter === "active" && styles.filterBtnActive]}
                    onPress={() => setFilter("active")}
                >
                    <Text style={[styles.filterText, filter === "active" && styles.filterTextActive]}>
                        В наявності
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Список товарів */}
            {filteredNotes.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Список товарів порожній</Text>
                </View>
            ) : (
                filteredNotes.map((item) => {
                    const isInCart = cart.some((cartItem) => cartItem.id === item.id);

                    return (
                        <View key={item.id} style={[styles.card, item.done && styles.cardDone]}>
                            <TouchableOpacity
                                style={styles.cardContent}
                                onPress={() => onToggle(item.id)}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.icon}>{item.icon || "📝"}</Text>
                                <View style={styles.textContainer}>
                                    <Text style={[styles.title, item.done && styles.titleDone]}>
                                        {item.text}
                                    </Text>
                                    <Text style={styles.price}>{item.price} грн</Text>
                                </View>
                            </TouchableOpacity>

                            <View style={styles.actionContainer}>
                                {onAddToCart && (
                                    <TouchableOpacity
                                        style={[styles.cartBtn, isInCart && styles.cartBtnAdded]}
                                        onPress={() => onAddToCart(item)}
                                        disabled={isInCart}
                                    >
                                        <Text style={[styles.cartBtnText, isInCart && styles.cartBtnTextAdded]}>
                                            {isInCart ? "✓ В кошику" : "🛒 В кошик"}
                                        </Text>
                                    </TouchableOpacity>
                                )}

                                <TouchableOpacity
                                    style={styles.deleteBtn}
                                    onPress={() => onDelete(item.id)}
                                    activeOpacity={0.6}
                                >
                                    <Text style={styles.deleteText}>🗑️</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                })
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginBottom: 16 },
    filterContainer: { flexDirection: "row", gap: 8, marginBottom: 16 },
    filterBtn: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#cbd5e1",
        elevation: 1,
    },
    filterBtnActive: { backgroundColor: "#2563eb", borderColor: "#2563eb" },
    filterText: { fontSize: 13, color: "#475569", fontWeight: "600" },
    filterTextActive: { color: "#ffffff" },
    emptyContainer: {
        paddingVertical: 24,
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    emptyText: { color: "#94a3b8", fontSize: 14, fontWeight: "500" },
    card: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 14,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        elevation: 2,
    },
    cardDone: { backgroundColor: "#f0fdf4", borderColor: "#86efac" },
    cardContent: { flexDirection: "row", alignItems: "center", flex: 1 },
    icon: { fontSize: 24, marginRight: 12 },
    textContainer: { flex: 1 },
    title: { fontSize: 15, fontWeight: "600", color: "#1e293b", marginBottom: 2 },
    titleDone: { textDecorationLine: "line-through", color: "#166534" },
    price: { fontSize: 13, color: "#2563eb", fontWeight: "bold" },
    actionContainer: { flexDirection: "row", alignItems: "center", gap: 8 },
    cartBtn: { backgroundColor: "#2563eb", paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8 },
    cartBtnAdded: { backgroundColor: "#dcfce7", borderWidth: 1, borderColor: "#86efac" },
    cartBtnText: { color: "#ffffff", fontSize: 12, fontWeight: "600" },
    cartBtnTextAdded: { color: "#166534" },
    deleteBtn: { padding: 6 },
    deleteText: { fontSize: 18 },
});