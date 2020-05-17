const Cache = require('node-cache');

class CacheManager {
    constructor(opts) {
        this.cache = new Cache({
            stdTTL: opts.ttl,
            checkperiod: opts.interval,
            deleteOnExpire: true
        });
    }

    async get(key, value) {
        if (this.cache.has(key)) return this.cache.get(key);
        else {
            if (typeof value === 'function') {
                const val = await value();
                this.cache.set(key, val);
                return val;
            } else {
                const val = this.cache.set(key);
                return val;
            }
        }
    }

    async set(key, value) {
        this.cache.set(key, value);
        return true;
    }

    async update(key, value) {
        if (!this.cache.has(value)) return false;
        else {
            this.delete(key);
            this.set(key, value);
            return true;
        }
    }

    async delete(key) {
        this.cache.del(key);
        return true;
    }

    async flush() {
        this.cache.flushAll();
        return true;
    }
}

module.exports = CacheManager;