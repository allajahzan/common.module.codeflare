import { IUser } from "../../types/IUser";

// Interface for Warning Produced
export interface IWarningProduced{
    senderId: string;
    sender: IUser;
    receiverId: string;
    message: string;
    date: string;
}