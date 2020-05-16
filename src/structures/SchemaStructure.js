class SchemaStructure {
    constructor(params) {
        this._name = params.name;
    }

    toString() {
        return JSON.stringify(this);
    }

    toJSON() {
        return Object(this);
    }
}

module.exports = SchemaStructure;