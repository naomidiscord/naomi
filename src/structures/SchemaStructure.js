class SchemaStructure {
    constructor(params) {
        this._name = params.name;
    }

    set(key, value) {
        if (!this[key]) return false;
        if (this[key] === value) return false;
        this[key] = value;
        return true;
    }

    toJSON() {
        return Object(this);
    }
}

module.exports = SchemaStructure;