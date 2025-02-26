// Add these type definitions
export interface AddAddressPayload {
    userId: string;
    addressData: {
      name: string;
      mobileNumber: string;
      pinCode: string;
      address: string;
      area?: string;
      landMark?: string;
      alterMobileNumber?: string;
    };
  }

  export interface Address {
    _id: string;
    user: string;
    name: string;
    mobileNumber: string;
    pinCode: string;
    address: string;
    area?: string;
    landMark?: string;
    alterMobileNumber?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface UpdateAddressPayload {
    id: string;
    addressData: Partial<Address>;
  }