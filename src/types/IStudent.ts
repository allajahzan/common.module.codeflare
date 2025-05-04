import { IStudentCategory } from "./IStudentCategory";

/** Interface for Student */
export interface IStudent {
    _id: string;
    name: string;
    email: string;
    role: string;
    profilePic: string;
    week?: string;
    domain?: string;
    batch: string;
    category: IStudentCategory;
    isBlock?: boolean;
}
