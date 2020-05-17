class SchemaStructure {
    constructor(params) {
        this._name = params.name;
    }

    toJSON() {
        return Object(this);
    }

    set(key, value) {
        if (!this[key]) return false;
        if (this[key] === value) return false;
        this[key] = value;
        return true;
    }
}

module.exports = SchemaStructure;