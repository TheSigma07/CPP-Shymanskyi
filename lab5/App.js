import { useRef, useState } from "react";
import { Alert, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

import Cart from "./components/Cart";
import Header from "./components/Header";
import PaymentModal from "./components/PaymentModal";
import StationeryForm from "./components/StationeryForm";
import StationeryList from "./components/StationeryList";
import TechStack from "./components/TechStack";

// Початковий каталог із 8 товарів за вашим скриншотом
const initialItems = [
    { id: "1", text: "Набір скріпок та затискачів", price: 40, icon: "📎", done: false },
    { id: "2", text: "Ножиці канцелярські", price: 50, icon: "✂️", done: false },
    { id: "3", text: "Щоденник датований", price: 210, icon: "📔", done: false },
    { id: "4", text: "Набір кольорових олівців", price: 140, icon: "✏️", done: true },
    { id: "5", text: "Альбом для малювання", price: 65, icon: "🎨", done: false },
    { id: "6", text: "Маркери для виділення (4 шт)", price: 95, icon: "✏️", done: false },
    { id: "7", text: "Набір гелевих ручок", price: 120, icon: "📝", done: false },
    { id: "8", text: "Зошит 48 арк.", price: 35, icon: "📓", done: false },
];

const initialCart = [];

function StationeryApp() {
    const insets = useSafeAreaInsets();
    const scrollRef = useRef(null);

    const [notes, setNotes] = useState(initialItems);
    const [cart, setCart] = useState(initialCart);
    const [filter, setFilter] = useState("all");
    const [activeSection, setActiveSection] = useState("top");
    const [showScrollTopButton, setShowScrollTopButton] = useState(false);
    const [isPayModalVisible, setPayModalVisible] = useState(false);

    function scrollToTop() {
        scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    }

    // Плавний скрол до обраної секції з шапки
    function scrollToSection(section) {
        setActiveSection(section);
        if (!scrollRef.current) return;

        if (section === "top") {
            scrollRef.current.scrollTo({ y: 0, animated: true });
        } else if (section === "catalog") {
            scrollRef.current.scrollTo({ y: 220, animated: true });
        } else if (section === "tech") {
            scrollRef.current.scrollToEnd({ animated: true });
        }
    }

    function handleScroll(event) {
        setShowScrollTopButton(event.nativeEvent.contentOffset.y > 150);
    }

    function addNote(text, price) {
        if (!text || text.trim() === "") {
            Alert.alert("Помилка", "Введіть назву товару.");
            return false;
        }
        const newNote = {
            id: Date.now().toString(),
            text: text.trim(),
            price: price ? Number(price) : 0,
            icon: "📝",
            done: false,
        };
        setNotes((prev) => [newNote, ...prev]);
        Alert.alert("Успіх", "Товар додано в каталог.");
        return true;
    }

    function toggleNote(id) {
        setNotes((prev) =>
            prev.map((note) => (note.id === id ? { ...note, done: !note.done } : note))
        );
    }

    function deleteNote(id) {
        setNotes((prev) => prev.filter((note) => note.id !== id));
        setCart((prev) => prev.filter((item) => item.id !== id));
        Alert.alert("Видалення", "Товар видалено з каталогу.");
    }

    function addToCart(item) {
        if (cart.some((c) => c.id === item.id)) {
            Alert.alert("Інформація", "Цей товар вже додано в кошик.");
            return;
        }
        setCart((prev) => [...prev, item]);
        Alert.alert("Успіх", `Товар "${item.text}" додано в кошик!`);
    }

    function removeFromCart(id) {
        setCart((prev) => prev.filter((item) => item.id !== id));
    }

    function resetList() {
        setNotes(initialItems);
        setCart(initialCart);
        setFilter("all");
        Alert.alert("Успіх", "Початковий каталог відновлено!");
    }

    const doneCount = notes.filter((n) => n.done).length;
    const topPadding = Math.max(insets.top, Platform.OS === "ios" ? 50 : 0);

    return (
        <View style={[styles.screen, { paddingTop: topPadding }]}>
            <StatusBar barStyle="dark-content" />

            {showScrollTopButton && (
                <View style={[styles.topCenterContainer, { top: topPadding + 10 }]}>
                    <TouchableOpacity style={styles.scrollTopButton} onPress={scrollToTop}>
                        <Text style={styles.scrollTopText}>⬆️</Text>
                    </TouchableOpacity>
                </View>
            )}

            <ScrollView
                ref={scrollRef}
                contentContainerStyle={styles.scrollContent}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <Header
                    total={notes.length}
                    done={doneCount}
                    onNavigate={scrollToSection}
                    activeSection={activeSection}
                />

                <StationeryForm onAdd={addNote} />

                <TouchableOpacity style={styles.resetBtn} onPress={resetList}>
                    <Text style={styles.resetBtnText}>🔄 Відновити початковий каталог</Text>
                </TouchableOpacity>

                <StationeryList
                    notes={notes}
                    filter={filter}
                    setFilter={setFilter}
                    onToggle={toggleNote}
                    onDelete={deleteNote}
                    cart={cart}
                    onAddToCart={addToCart}
                />

                <Cart
                    cart={cart}
                    onRemoveFromCart={removeFromCart}
                    onOpenPayment={() => setPayModalVisible(true)}
                />

                {/* Блок Переваги */}
                <TechStack />
            </ScrollView>

            <PaymentModal
                visible={isPayModalVisible}
                onClose={() => setPayModalVisible(false)}
                totalAmount={cart.reduce((sum, i) => sum + (i.price || 0), 0)}
            />
        </View>
    );
}

export default function App() {
    return (
        <SafeAreaProvider>
            <StationeryApp />
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#eff6ff",
    },
    scrollContent: {
        padding: 16,
        paddingTop: 10,
        paddingBottom: 30,
    },
    topCenterContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        alignItems: "center",
        zIndex: 999,
    },
    scrollTopButton: {
        backgroundColor: "#2563eb",
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: "center",
        alignItems: "center",
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    scrollTopText: {
        fontSize: 18,
    },
    resetBtn: {
        backgroundColor: "#ffffff",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#cbd5e1",
        elevation: 1,
    },
    resetBtnText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#2563eb",
    },
});