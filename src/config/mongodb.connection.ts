import mongoose from "mongoose";
export class MongodbConnection {
    private attempt: number = 1;
    private retries: number = 5;
    private delay: number = 5000;
    private url: string;

    /**
     * Creates an instance of MongodbConnection.
     * @param {string} url The mongodb connection string
     */
    constructor(url: string) {
        this.url = url;
    }

    /**
     * Retries connecting to MongoDB before giving up.
     * @throws {Error} If all attempts to connect failed.
     */
    async retryConnection() {
        while (this.attempt <= this.retries) {
            try {
                await mongoose.connect(this.url);
                console.log("Connected to MongoDB");
                return;
            } catch (err: any) {
                console.log(
                    `Connection attempt ${this.attempt} failed : ${err.message}. Retrying in ${this.delay}ms...`
                );
                await new Promise((res) => setTimeout(res, this.delay));
                this.attempt++;
            }
        }
        throw new Error("Failed to connect to MongoDB after retries.");
    }
}
