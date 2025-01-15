import { Document, FilterQuery, Model, QueryOptions, UpdateQuery } from "mongoose";
import { IBaseRepository } from "./IBaseRepository";

/** Implementaion of Base Repository */
export class BaseRepository<T extends Document> implements IBaseRepository<T> {
    protected readonly model: Model<T>;

    /**
     * Constructs an instance of BaseRepository.
     * @param model - The model of type T which will be used by the repository.
     */
    constructor(model: Model<T>) {
        this.model = model;
    }

    /**
     * Finds multiple documents in the database that match the given query.
     * @param query - The query to filter the documents.
     * @returns A promise that resolves to an array of documents that match the query.
     *          If an error occurs, it returns an empty array.
     */
    async find(query: FilterQuery<T>): Promise<T[] | []> {
        try {
            return await this.model.find(query);
        } catch (err: any) {
            return [];
        }
    }

    /**
     * Finds a single document in the database that matches the given query.
     * @param query - The query to filter the documents.
     * @returns A promise that resolves to the document that matches the query if found, otherwise null.
     */
    async findOne(query: FilterQuery<T>): Promise<T | null> {
        try {
            return await this.model.findOne(query);
        } catch (err: any) {
            return null;
        }
    }

    /**
     * Creates a new document in the database using the provided data.
     * @param data - Partial data of type T to create the document.
     * @returns A promise that resolves to the newly created document if successful, otherwise null.
     */
    async create(data: Partial<T>): Promise<T | null> {
        try {
            const createdDocument = new this.model(data);
            return await createdDocument.save();
        } catch (err: any) {
            return null;
        }
    }

    /**
     * Updates a single document in the database that matches the given query.
     * @param query - The query to filter the documents.
     * @param data - The data to update the document with.
     * @returns A promise that resolves to the updated document if successful, otherwise null.
     */
    async update(query: FilterQuery<T>, data: UpdateQuery<T>, option?: QueryOptions): Promise<T | null> {
        try {
            const updatedDocument = await this.model.findOneAndUpdate(query, data, option? option : {});
            return updatedDocument;
        } catch (err: any) {
            return null;
        }
    }

    /**
     * Deletes a single document in the database that matches the given query.
     * @param query - The query to filter the documents.
     * @returns A promise that resolves to the deleted document if successful, otherwise null.
     */
    async delete(query: FilterQuery<T>): Promise<T | null> {
        try {
            const deletedDocument = await this.model.findOneAndDelete(query);
            return deletedDocument;
        } catch (err: any) {
            return null;
        }
    }
}
