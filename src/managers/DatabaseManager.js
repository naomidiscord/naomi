const MongoClient = require('mongodb').MongoClient;

class DatabaseManager {
    constructor(opts) {
        this.opts = opts;
        this.ready = false;

        this.activeCollection = null;

        this.connect();
    }

    collection(name) {
        this.activeCollection = name;

        return this;
    }

    async connect() {
        this.connection = await MongoClient.connect(this.opts.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        this.db = await this.connection.db(this.opts.dbName);
        this.ready = true;

        return true;
    }

    async add(document) {
        const collection = this.db.collection(this.activeCollection);

        await collection.insertOne(document);

        return document;
    }

    async update(query, newDocument) {
        const collection = this.db.collection(this.activeCollection);
        const document = await this.find(query);

        if (typeof document === 'array') return false;

        await collection.updateOne(query, { $set: newDocument });
    }

    async all() {
        const collection = this.db.collection(this.activeCollection);
        const documents = await collection.find({}).toArray();
        
        return documents;
    }

    async has(query) {
        const documents = await this.find(query);

        if (!documents) return false;

        if (typeof documents === 'array' && (documents.length > 1)) return documents.length;
        else return true;
    }

    async find(query) {
        const collection = this.db.collection(this.activeCollection);
        const documents = await collection.find(query).toArray();
        
        if (documents.length === 1) return documents[0];
        else return documents;
    }

    async ensure(query, document) {
        const documents = await this.find(query);

        if (!documents || !documents.length) {
            await this.add(document);
            return document;
        } else return documents[0];
    }

    async delete(query) {
        const documents = await this.find(query);

        if (!documents) return false;

        const collection = this.db.collection(this.activeCollection);

        if (typeof documents === 'array') {
            // TODO: add support for deleting multiple
        } else {
            await collection.deleteOne({ _id: documents._id });
            
            return true;
        }
    }
}

module.exports = DatabaseManager;