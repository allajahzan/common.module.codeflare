/** Interface for User */
export interface IUser {
    _id: string;
    name: string;
    email: string;
    phoneNo?: string;
    role: "admin" | "coordinator" | "instructor";
    profilePic: string;
    domain?: string;
    batches?: string[];
    lastActive?: Date;
    createdAt: Date;
    isBlock: boolean;
}
