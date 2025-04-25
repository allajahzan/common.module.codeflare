import { IUser } from "../../types/IUser";

// Interface for Warning event
export interface IWarning {
    senderId: string;
    sender: IUser;
    receiverId: string;
    message: string;
}