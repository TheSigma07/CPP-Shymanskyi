import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Cart({ cart, onRemoveFromCart, onOpenPayment }) {
    const totalPrice = cart.reduce((sum, item) => sum + (item.price || 0), 0);

    return (
        <View style={styles.card}>
            <Text style={styles.title}>🛒 Ваш кошик</Text>

            {cart.length === 0 ? (
                <Text style={styles.emptyText}>Кошик порожній</Text>
            ) : (
                <>
                    {cart.map((item) => (
                        <View key={item.id} style={styles.itemRow}>
                            <Text style={styles.itemText}>
                                {item.icon || "📦"} {item.text}
                            </Text>

                            <View style={styles.rightGroup}>
                                <Text style={styles.itemPrice}>{item.price} грн</Text>

                                {/* Хрестик для відмови від покупки товару */}
                                <TouchableOpacity
                                    onPress={() => onRemoveFromCart(item.id)}
                                    style={styles.removeBtn}
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                >
                                    <Text style={styles.removeText}>✕</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}

                    <View style={styles.summaryContainer}>
                        <Text style={styles.summaryText}>
                            Всього: <Text style={styles.boldText}>{cart.length}</Text> | Сума:{" "}
                            <Text style={styles.totalPriceText}>{totalPrice} грн</Text>
                        </Text>

                        <TouchableOpacity style={styles.payBtn} onPress={onOpenPayment}>
                            <Text style={styles.payBtnText}>Оформити замовлення та оплатити 💳</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        elevation: 2,
    },
    title: { fontSize: 16, fontWeight: "bold", color: "#1e293b", marginBottom: 12 },
    emptyText: { textAlign: "center", color: "#94a3b8", marginVertical: 12, fontSize: 14 },
    itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#f1f5f9",
    },
    itemText: { fontSize: 14, color: "#334155", flex: 1, marginRight: 8 },
    rightGroup: { flexDirection: "row", alignItems: "center", gap: 12 },
    itemPrice: { fontSize: 14, fontWeight: "bold", color: "#16a34a" },
    removeBtn: { padding: 4 },
    removeText: { fontSize: 16, color: "#ef4444", fontWeight: "bold" },
    summaryContainer: { marginTop: 14, paddingTop: 10, borderTopWidth: 1, borderTopColor: "#e2e8f0" },
    summaryText: { fontSize: 14, color: "#475569", marginBottom: 10 },
    boldText: { fontWeight: "bold", color: "#0f172a" },
    totalPriceText: { fontWeight: "bold", color: "#16a34a", fontSize: 15 },
    payBtn: {
        backgroundColor: "#059669",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    payBtnText: { color: "#ffffff", fontWeight: "bold", fontSize: 14 },
});