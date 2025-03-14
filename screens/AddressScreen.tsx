import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Animated, Alert, Modal, TextInput } from 'react-native';
import { RootState, useAppDispatch, useAppSelector } from "../core/state_management/store";
import { fetchAddresses, addAddress, updateAddress, deleteAddress } from '../core/api/UserRepo';
import { Button, Card, Text, FAB, RadioButton } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Swipeable } from 'react-native-gesture-handler';
import { GlobalStyle } from '../constants/styles';
import { Address } from '../model/AddressModel';
import CustomMessageDialog from '../components/base_components/CustomMessageDialog';
import { resetAddressState, setDialog } from '../core/state_management/screen_slice/AddressSlice';

const AddressScreen = () => {
    const dispatch = useAppDispatch();
    const { addresses, loading, dialog } = useAppSelector(state => state.address);
    const [visible, setVisible] = useState(false);
    const [editAddress, setEditAddress] = useState<Address | null>(null);
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

    // Form state
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [address, setAddress] = useState('');
    const [area, setArea] = useState('');
    const [landMark, setLandMark] = useState('');
    const [alterMobileNumber, setAlterMobileNumber] = useState('');

    // Replace with actual user ID source
    const userId = "1";

    useEffect(() => {
        dispatch(fetchAddresses(userId));
    }, []);

    const renderRightActions = (
        progress: Animated.AnimatedInterpolation<number>,
        dragX: Animated.AnimatedInterpolation<number>
    ) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View style={[styles.deleteContainer, { transform: [{ scale }] }]}>
                <Ionicons name="remove" size={24} color="#fff" />
            </Animated.View>
        );
    };

    const handleSave = async () => {
        if (!name || !mobileNumber || !pinCode || !address) {
            dispatch(setDialog({
                visible: true,
                message: "Please fill all required fields.",
                type: "error"
            }));
            return;
        }

        const addressData = {
            name,
            mobileNumber,
            pinCode,
            address,
            area: area || undefined,
            landMark: landMark || undefined,
            alterMobileNumber: alterMobileNumber || undefined,
        };

        try {
            if (editAddress) {
                console.log("EDIT: " + editAddress._id,)
                console.log("EDIT: " + editAddress._id,)
                const response = await dispatch(updateAddress({
                    userId: userId,
                    addressId: editAddress._id,
                    addressData
                })).unwrap();

                dispatch(setDialog({
                    visible: true,
                    message: response.message || "Address updated successfully!",
                    type: "success"
                }));
            } else {
                const response = await dispatch(addAddress({
                    userId: userId,
                    addressData: addressData
                })).unwrap();

                dispatch(setDialog({
                    visible: true,
                    message: response.message || "Address added successfully!",
                    type: "success"
                }));
            }
            setVisible(false);
            resetForm();
        } catch (error: any) {
            dispatch(setDialog({
                visible: true,
                message: error.message || "Failed to save address",
                type: "error"
            }));
        }
    };

    const resetForm = () => {
        setName('');
        setMobileNumber('');
        setPinCode('');
        setAddress('');
        setArea('');
        setLandMark('');
        setAlterMobileNumber('');
        setEditAddress(null);
    };

    const AddressItem = ({ item }: { item: Address }) => (
        <Swipeable
            renderRightActions={renderRightActions}
            onSwipeableRightOpen={() => handleDelete(item._id)}
        >
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.addressHeader}>
                        <Text variant="titleMedium" style={styles.addressTitle}>
                            {item.name}
                        </Text>
                        {selectedAddress === item._id && (
                            <Ionicons name="person-remove" size={20} color={GlobalStyle.primaryColor} onPress={() => setSelectedAddress(null)} />
                        )}
                    </View>
                    <Text style={styles.addressText}>{item.address}</Text>
                    <Text style={styles.addressText}>{item.area}</Text>
                    <Text style={styles.addressText}>
                        {item.landMark && `Landmark: ${item.landMark}`}
                    </Text>
                    <Text style={styles.addressText}>
                        {item.mobileNumber} • {item.pinCode}
                    </Text>
                    <View style={styles.addressActions}>
                        <RadioButton
                            value={item._id}
                            status={selectedAddress === item._id ? 'checked' : 'unchecked'}
                            onPress={() => setSelectedAddress(item._id)}
                            color={GlobalStyle.primaryColor}
                        />
                        <Button
                            mode="text"
                            onPress={() => {
                                setEditAddress(item);
                                setName(item.name);
                                setMobileNumber(item.mobileNumber);
                                setPinCode(item.pinCode);
                                setAddress(item.address);
                                setArea(item.area || '');
                                setLandMark(item.landMark || '');
                                setAlterMobileNumber(item.alterMobileNumber || '');
                                setVisible(true);
                            }}
                        >
                            Edit
                        </Button>
                    </View>
                </Card.Content>
            </Card>
        </Swipeable>
    );

    const handleDelete = (id: string) => {
        Alert.alert(
            'Delete Address',
            'Are you sure you want to delete this address?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            await dispatch(deleteAddress({
                                userId: userId,
                                addressId: id,
                            })).unwrap();
                            // Refresh the addresses list after successful deletion
                            dispatch(fetchAddresses(userId));
                        } catch (error) {
                            console.error('Failed to delete address:', error);
                        }
                    }
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={addresses}
                renderItem={({ item }) => <AddressItem item={item} />}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No addresses found. Add your first address!</Text>
                }
                refreshing={loading}
                onRefresh={() => dispatch(fetchAddresses(userId))}
            />

            <FAB
                icon="plus"
                style={styles.fab}
                color="#fff"
                onPress={() => {
                    resetForm();
                    setVisible(true);
                }}
            />

            <CustomMessageDialog
                isVisible={dialog.visible}
                message={dialog.message}
                type={dialog.type}
                onClose={() => {
                    setVisible(false);
                    resetForm();
                    dispatch(resetAddressState());
                }}
            />

            <Modal
                visible={visible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Card style={styles.modalCard}>
                        <Card.Title
                            title={editAddress ? 'Edit Address' : 'Add New Address'}
                            right={() => (
                                <Ionicons
                                    name="close"
                                    size={24}
                                    onPress={() => setVisible(false)}
                                    style={styles.closeIcon}
                                />
                            )}
                        />
                        <Card.Content>
                            <TextInput
                                style={styles.input}
                                placeholder="Full Name"
                                value={name}
                                onChangeText={setName}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Mobile Number"
                                value={mobileNumber}
                                onChangeText={setMobileNumber}
                                keyboardType="phone-pad"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="PIN Code"
                                value={pinCode}
                                onChangeText={setPinCode}
                                keyboardType="number-pad"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Full Address"
                                value={address}
                                onChangeText={setAddress}
                                multiline
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Area (optional)"
                                value={area}
                                onChangeText={setArea}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Landmark (optional)"
                                value={landMark}
                                onChangeText={setLandMark}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Alternate Mobile (optional)"
                                value={alterMobileNumber}
                                onChangeText={setAlterMobileNumber}
                                keyboardType="phone-pad"
                            />
                            <Button
                                mode="contained"
                                style={styles.saveButton}
                                onPress={handleSave}
                                loading={loading}
                            >
                                {editAddress ? 'Update Address' : 'Save Address'}
                            </Button>
                        </Card.Content>
                    </Card>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    listContent: {
        marginVertical: 10,
    },
    card: {
        marginBottom: 16,
        borderRadius: 12,
        elevation: 2,
        marginHorizontal: 10,
    },
    addressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    addressTitle: {
        fontWeight: '600',
        color: GlobalStyle.primaryColor,
    },
    addressText: {
        color: '#666',
        marginBottom: 4,
    },
    addressActions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    fab: {
        position: 'absolute',
        margin: 24,
        right: 0,
        bottom: 0,
        backgroundColor: GlobalStyle.primaryColor,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
    },
    modalCard: {
        borderRadius: 16,
        padding: 16,
    },
    input: {
        backgroundColor: '#fff',
        marginBottom: 12,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    saveButton: {
        marginTop: 16,
        borderRadius: 8,
    },
    deleteContainer: {
        backgroundColor: '#ff4444',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        borderRadius: 12,
        marginBottom: 16,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 24,
        color: '#666',
    },
    closeIcon: {
        marginRight: 16,
    },
    dialogContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dialogContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    dialogMessage: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default AddressScreen;