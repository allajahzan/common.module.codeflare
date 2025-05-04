/** Interface for User */
export interface IUser {
    _id: string;
    name: string;
    email: string;
    phoneNo: string;
    role: string;
    profilePic: string;
    domain?: string;
    batches: string[];
    isBlock: boolean;
    createdAt: Date;
}
