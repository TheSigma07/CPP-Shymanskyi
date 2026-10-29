import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Header({ total, done, onNavigate, activeSection = "top" }) {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.title}>PaperCraft ✏️</Text>
            <Text style={styles.subtitle}>
                Сучасний онлайн-магазин канцтоварів для навчання, творчості та офісу.
            </Text>

            {/* Кнопки навігації по секціях */}
            <View style={styles.navContainer}>
                <TouchableOpacity onPress={() => onNavigate && onNavigate("top")}>
                    <Text style={[styles.navItem, activeSection === "top" && styles.navActive]}>
                        Головна
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onNavigate && onNavigate("catalog")}>
                    <Text style={[styles.navItem, activeSection === "catalog" && styles.navActive]}>
                        Каталог
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onNavigate && onNavigate("tech")}>
                    <Text style={[styles.navItem, activeSection === "tech" && styles.navActive]}>
                        Переваги
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: "#1e293b",
        padding: 20,
        borderRadius: 16,
        alignItems: "center",
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 13,
        color: "#38bdf8",
        textAlign: "center",
        marginBottom: 16,
    },
    navContainer: {
        flexDirection: "row",
        gap: 16,
    },
    navItem: {
        color: "#94a3b8",
        fontSize: 14,
        fontWeight: "600",
    },
    navActive: {
        color: "#38bdf8",
        textDecorationLine: "underline",
    },
});