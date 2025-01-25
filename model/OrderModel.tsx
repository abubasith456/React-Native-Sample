// Interface for Address
interface Address {
    name: string;
    addressLine1: string;
    addressLine2: string;
    area: string;
    pincode: string;
    phoneNumber: string;
    id: string;
}

// Interface for Product
export interface Product {
    _id: string;
    productId: string;
    quantity: string;
    image: string;
}

// Interface for Order
export interface Order {
    _id: string;
    status: string;
    unique_id: number;
    numOfItems: number;
    user_id: number;
    user_name: string;
    products: Product[];
    amount: number;
    address: Address;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

// Array of Orders
export type OrderResponse = Order[];
