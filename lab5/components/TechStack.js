import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TechStack() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>✨ Наші переваги</Text>

            <View style={styles.grid}>
                <View style={styles.card}>
                    <Text style={styles.icon}>🚀</Text>
                    <Text style={styles.cardTitle}>Швидка доставка</Text>
                    <Text style={styles.cardDesc}>Відправляємо замовлення в день оформлення по всій Україні.</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.icon}>💎</Text>
                    <Text style={styles.cardTitle}>Якісна канцелярія</Text>
                    <Text style={styles.cardDesc}>Працюємо тільки з перевіреними та надійними брендами.</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.icon}>🔒</Text>
                    <Text style={styles.cardTitle}>Безпечна оплата</Text>
                    <Text style={styles.cardDesc}>Гарантія захисту ваших платежів та легке повернення.</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 20,
        marginTop: 8,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1e293b",
        marginBottom: 16,
        textAlign: "center",
    },
    grid: {
        gap: 12,
    },
    card: {
        backgroundColor: "#f8fafc",
        padding: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#f1f5f9",
    },
    icon: {
        fontSize: 24,
        marginBottom: 6,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#0f172a",
        marginBottom: 4,
    },
    cardDesc: {
        fontSize: 13,
        color: "#64748b",
    },
});