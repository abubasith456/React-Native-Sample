import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchAddresses, addAddress, updateAddress, deleteAddress } from '../../api/UserRepo';
import { Address } from '../../../model/AddressModel';

interface AddressState {
    addresses: Address[];
    loading: boolean;
    error: boolean;
    errorMessage: string | null;
    dialog: { visible: boolean; message: string; type: 'error' | 'info' | 'success' };
}

const initialState: AddressState = {
    addresses: [],
    loading: false,
    error: false,
    errorMessage: null,
    dialog: { visible: false, message: '', type: 'info' },
};

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        resetAddressState: (state) => {
            state.loading = false;
            state.errorMessage = null;
            state.dialog = initialState.dialog;
        },
        cacheAddresses: (state, action: PayloadAction<Address[]>) => {
            state.addresses = action.payload;
        },
        setDialog: (state, action) => {
            state.dialog = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAddresses.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchAddresses.fulfilled, (state, action) => {
                state.addresses = action.payload.data;
                state.loading = false;
                state.error = false;
            })
            .addCase(fetchAddresses.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload as string;
            })

            // Add Address
            .addCase(addAddress.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.addresses.push(action.payload.data);
                state.loading = false;
                state.dialog = {
                    visible: true,
                    message: 'Address added successfully',
                    type: 'success'
                };
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.dialog = {
                    visible: true,
                    message: action.payload as string,
                    type: 'error'
                };
            })

            // Update Address
            .addCase(updateAddress.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                console.log("updateAddress.fulfilled ")
                console.log("state.addresses: " + JSON.stringify(state.addresses))
                console.log("action.payload.: " + action.payload.data)
                const index = state.addresses.findIndex(a => a._id === action.payload.data._id);
                console.log("findIndex " + index)
                if (index !== -1) {
                    state.addresses[index] = action.payload.data;
                }
                state.loading = false;
                state.dialog = {
                    visible: true,
                    message: 'Address updated successfully',
                    type: 'success'
                };
            })
            .addCase(updateAddress.rejected, (state, action) => {
                console.log("updateAddress.rejected")
                state.loading = false;
                state.error = true;
                state.dialog = {
                    visible: true,
                    message: action.payload as string,
                    type: 'error'
                };
            })

            // Delete Address
            .addCase(deleteAddress.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                // Filter out the deleted address
                const updatedAddresses = state.addresses.filter(address => address._id !== action.payload.data._id);

                // Update the state with new array
                state.addresses = [...updatedAddresses];
                state.loading = false;
                state.dialog = {
                    visible: true,
                    message: 'Address deleted successfully',
                    type: 'success'
                };
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.dialog = {
                    visible: true,
                    message: action.payload as string,
                    type: 'error'
                };
            });
    },
});

export const { resetAddressState, cacheAddresses, setDialog } = addressSlice.actions;
export default addressSlice.reducer;