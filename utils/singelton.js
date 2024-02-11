const { MongoClient } = require("mongodb");

module.exports = class ConnectToMongoDB {
    #DB_URI = "mongodb://localhost:27017/mini-projectDB";
    #db = null;
    async #connect() {
        const client = new MongoClient(this.#DB_URI);
        this.#db = client.db()
        return this.#db
    }

    async Get() {
        if (this.#db) {
            console.log("connection is still alive");
            return this.#db
        } else {
            this.#db = await this.#connect();
            return this.#db
        }
    }

}