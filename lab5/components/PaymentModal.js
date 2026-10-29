import React from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function PaymentModal({
                                         visible,
                                         totalPrice,
                                         cardNumber,
                                         expiry,
                                         cvc,
                                         onClose,
                                         onChangeCardNumber,
                                         onChangeExpiry,
                                         onChangeCvc,
                                         onConfirmPayment,
                                     }) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={modalStyles.overlay}>
                <View style={modalStyles.modalContent}>
                    <View style={modalStyles.header}>
                        <Text style={modalStyles.title}>💳 Оплата карткою</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={modalStyles.closeBtn}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={modalStyles.amountText}>
                        Сума до сплати: <Text style={modalStyles.amountBold}>{totalPrice} грн</Text>
                    </Text>

                    <View style={modalStyles.fieldGroup}>
                        <Text style={modalStyles.label}>Номер картки</Text>
                        <TextInput
                            style={modalStyles.input}
                            placeholder="0000 0000 0000 0000"
                            keyboardType="numeric"
                            value={cardNumber}
                            onChangeText={onChangeCardNumber}
                            maxLength={19}
                        />
                    </View>

                    <View style={modalStyles.row}>
                        <View style={[modalStyles.fieldGroup, { flex: 1 }]}>
                            <Text style={modalStyles.label}>Термін дії</Text>
                            <TextInput
                                style={modalStyles.input}
                                placeholder="MM/YY"
                                keyboardType="numeric"
                                value={expiry}
                                onChangeText={onChangeExpiry}
                                maxLength={5}
                            />
                        </View>

                        <View style={[modalStyles.fieldGroup, { flex: 1 }]}>
                            <Text style={modalStyles.label}>CVC / CVV</Text>
                            <TextInput
                                style={modalStyles.input}
                                placeholder="123"
                                keyboardType="numeric"
                                secureTextEntry={true}
                                value={cvc}
                                onChangeText={onChangeCvc}
                                maxLength={3}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={modalStyles.payBtn}
                        onPress={onConfirmPayment}
                        activeOpacity={0.8}
                    >
                        <Text style={modalStyles.payBtnText}>Сплатити {totalPrice} грн</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={modalStyles.cancelBtn} onPress={onClose}>
                        <Text style={modalStyles.cancelBtnText}>Скасувати</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const modalStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(15, 23, 42, 0.6)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    modalContent: {
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 20,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#0f172a",
    },
    closeBtn: {
        fontSize: 20,
        color: "#64748b",
        fontWeight: "bold",
        padding: 4,
    },
    amountText: {
        fontSize: 16,
        color: "#475569",
        marginBottom: 16,
    },
    amountBold: {
        fontWeight: "bold",
        color: "#059669",
    },
    fieldGroup: {
        marginBottom: 12,
    },
    label: {
        fontSize: 13,
        fontWeight: "600",
        color: "#334155",
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: "#cbd5e1",
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        backgroundColor: "#f8fafc",
    },
    row: {
        flexDirection: "row",
        gap: 12,
    },
    payBtn: {
        backgroundColor: "#059669",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 8,
    },
    payBtnText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
    cancelBtn: {
        padding: 12,
        alignItems: "center",
        marginTop: 4,
    },
    cancelBtnText: {
        color: "#64748b",
        fontSize: 14,
        fontWeight: "600",
    },
});