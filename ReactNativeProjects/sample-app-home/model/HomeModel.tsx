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

export interface HomeResponse {
    success: boolean;
    data: {
        user: User | null;
        banner: Banner[] | null;
        categories: Category[] | null;
    };
}
