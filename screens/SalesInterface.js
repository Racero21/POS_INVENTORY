import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';

// Sample product data
const products = [
    { id: '1', name: 'Product A', price: 10 },
    { id: '2', name: 'Product B', price: 20 },
    { id: '3', name: 'Product C', price: 15 },
    { id: '4', name: 'Product D', price: 30 },
    // Add more products as needed
];

const ProductCard = ({ product, onAddToCart }) => (
    <TouchableOpacity style={styles.productCard} onPress={() => onAddToCart(product)}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>₱{product.price.toFixed(2)}</Text>
    </TouchableOpacity>
);

const ReceiptPreview = ({ cartItems }) => (
    <ScrollView style={styles.receiptContainer}>
        <Text style={styles.receiptTitle}>Receipt Preview</Text>
        {cartItems.map((item, index) => (
            <View key={index} style={styles.receiptItem}>
                <Text>₱{(item.price * item.quantity).toFixed(2)}</Text>
                <Text>{item.name} x {item.quantity}</Text>
            </View>
        ))}
        <View style={styles.receiptTotal}>
            <Text>Total:</Text>
            <Text>
                ₱{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
            </Text>
        </View>
    </ScrollView>
);

export default function SalesInterface() {
    const [cartItems, setCartItems] = useState([]);

    const handleAddToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.productCatalog}>
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ProductCard product={item} onAddToCart={handleAddToCart} />
                    )}
                    numColumns={2} // Adjust columns as needed
                />
            </View>
            <View style={styles.receiptPreview}>
                <ReceiptPreview cartItems={cartItems} />
                <TouchableOpacity style={styles.checkout} onPress={() => {/* Implement Checkout Logic */}}>
                    <Text style={styles.cancelText}>CHECKOUT</Text>
                </TouchableOpacity>
                <View style={{paddingTop: 10}}>
                    <TouchableOpacity style={styles.cancel} onPress={() => {}}>
                        <Text style={styles.cancelText}>CLEAR ORDERS</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cancelText: {
        fontSize: 16,  // Default font size for button text
        color: '#fff',  // Default color for button text on iOS (blue color)
        textAlign: 'center',
        fontWeight: '500'
    },
    checkout: {
        backgroundColor: 'green',
        // paddingTop: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderwidth: 2,
        borderRadius: 5,
    },
    cancel: {
        backgroundColor: 'orange',
        // paddingTop: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderwidth: 2,
        borderRadius: 5,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    productCatalog: {
        flex: 2,
        padding: 10,
    },
    receiptPreview: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f9f9f9',
    },
    productCard: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        margin: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2, // For a shadow effect
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 16,
        color: '#888',
    },
    receiptContainer: {
        flex: 1,
    },
    receiptTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    receiptItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    receiptTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingTop: 10,
    },
});
