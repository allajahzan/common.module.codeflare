import { IWeek } from "./IWeek";

/** Inteface for domainsweek */
export interface IDomainsWeek {
    week: IWeek;
    title: string;
}

/** Interface for domain */
export interface IDomain {
    _id: string;
    name: string;
    imageUrl: string;
    domainsWeeks: IDomainsWeek[]
}