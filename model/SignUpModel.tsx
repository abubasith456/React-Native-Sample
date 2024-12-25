export interface SignUpResponse {
    status: number;
    connection: string;
    message: string;
    userData: UserData | null;
}
export interface UserData {
    user_id: number;
    username: string;
    email: string;
    dateOfBirth: string; // Use 'string' if the date is not in ISO format
}