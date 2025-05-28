import { IReviewCategory } from "./IReviewCategory";
import { IStudentCategory } from "./IStudentCategory";

/** Interface for Student */
export interface IStudent {
    _id: string;
    name: string;
    email: string;
    phoneNo?: string;
    role: "student";
    profilePic: string;
    week?: string;
    domain?: string;
    batch: string;
    category: IStudentCategory;
    review: IReviewCategory;
    lastActive?: Date;
    createdAt: Date;
    isBlock: boolean;
}
