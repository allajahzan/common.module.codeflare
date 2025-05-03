// Interface for Student
export interface IStudent {
    _id: string,
    name: string,
    email: string,
    role: string,
    profilePic: string
    domainId?: string
    weekId?: string
    batchId?: string
    isBlock?: boolean
}