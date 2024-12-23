export interface Product {
    _id: string;
    productId: string;
    productName: string;
    productImage: string;
    price: string;
}

export interface Banner {
    _id: string;
    name: string;
    percentage: string;
    products: Product[];
    __v: number;
}

export interface Category {
    _id: string;
    name: string;
    description: string;
    image: string;
    link: string;
    __v: number;
}

export interface User {
    _id: string;
    unique_id: number;
    username: string
    email: string;
    dateOfBirth: string;
    mobileNumber: string;
    password: string;
    __v: number;
    role: string;
    address: any[]; // Can be refined if you have an address structure
    profilePic: string;
    updatedAt: string;
}

export interface Product {
    _id: string;
    isLiked: boolean;
    name: string;
    price: string;
    description: string;
    productImage: string;
    __v: number;
}

export interface Address {
    name: string;
    addressLine1: string;
    addressLine2: string;
    area: string;
    pincode: string;
    phoneNumber: string;
    id: string;
}

export interface PurchasedProduct {
    _id: string;
    productId: string;
    quantity: string;
}

export interface RecentPurchase {
    _id: string;
    status: string;
    unique_id: number;
    numOfItems: number;
    user_id: number;
    user_name: string;
    products: PurchasedProduct[];
    amount: number;
    address: Address;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface HomeResponse {
    success: boolean;
    data: {
        user: User | null;
        banner: Banner[] | null;
        categories: Category[] | null;
        products: Product[] | null;
        recentPurchase: RecentPurchase[] | null;
    };
}
