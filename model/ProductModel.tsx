export interface Product {
    _id: string;
    isLiked: boolean;
    name: string;
    price: string;
    description: string;
    productImage: string;  // This is the old field.
    images: string[];  // New field: Array of image URLs
    priceAfterDiscount: number;  // New field
    quantity: number;  // New field
    sold: number;  // New field
    category: string;  // Assuming this is a category ID
    createdAt: string;
    updatedAt: string;
    __v: number;
    id?: string;  // Compatibility with the old field if it's used
}