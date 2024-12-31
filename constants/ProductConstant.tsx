// Define the Category type
export type Category =
    | 'vegetables'
    | 'fruits'
    | 'drinks'
    | 'groceries'
    | 'healthcares'
    | 'driednoodles'
    | 'babyitems'
    | 'personalcares';

// Define the quantityOptions object with typing
export const quantityOptions: Record<Category, (string | number)[]> = {
    vegetables: ['250g', '500g', '1kg', '1.5kg'],
    fruits: ['200g', '500g', '1kg', '1.5kg', '2kg'],
    drinks: ['2000ml', '250ml', '500ml', '1L'],
    groceries: ['50g', '100g', '200g', '500g', '1kg'],
    healthcares: [1],
    driednoodles: ['100g', '200g'],
    babyitems: [1],
    personalcares: [1],
};

// Define the Product interface
export interface ProductDetailsModel {
    name: string;
    category: Category;
    price: number;
}

export const getUnitForCategory = (category: any) => {
    switch (category) {
        case 'vegetables':
        case 'fruits':
            return 'kg';
        case 'drinks':
            return 'ml';
        case 'grocery':
            return 'g';
        case 'healthcares':
        case 'driednoodles':
        case 'babyitem':
        case 'personalcares':
            return 'count';
        default:
            return '';
    }
};
