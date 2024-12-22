import { Category, RecentPurchase, PurchasedProduct } from "../model/HomeModel";

// Dummy data
export const categoriesData: Category[] = [
    {
        _id: "1",
        name: "Enjoy",
        description: "",
        image: "https://via.placeholder.com/100",
        link: "",
        __v: 0
    },
    {
        _id: "2",
        name: "Your",
        description: "",
        image: "https://via.placeholder.com/100",
        link: "",
        __v: 0
    },
    {
        _id: "3",
        name: "Orders",
        description: "",
        image: "https://via.placeholder.com/100",
        link: "",
        __v: 0
    }
];

export const productsData = Array(10).fill({
    id: Math.random().toString(),
    name: 'Product Name',
    price: 'Rs.100',
    image: 'https://via.placeholder.com/150',
});

export const recentPurchasesData: RecentPurchase[] = [
    {
        _id: "1",
        status: "Done",
        unique_id: 1,
        numOfItems: 10,
        user_id: 1,
        user_name: "",
        products: [
            {
                _id: "1",
                productId: "",
                quantity: "",
            }
        ],
        amount: 100,
        address: {
            name: "",
            addressLine1: "",
            addressLine2: "",
            area: "",
            pincode: "",
            phoneNumber: "",
            id: "",
        },  // Single address object, not an array
        createdAt: "",
        updatedAt: "",
        __v: 0,
    }
];

