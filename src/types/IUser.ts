/** Interface for user */
export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: string;
    profilePic: string;
    domainId?: string;
    isBlock?: boolean;
}