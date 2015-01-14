function LocmemCache() {
    this.cache = {};
    this.states = {};
}

/**
 * TODO: We can make smarter caching decisions.
 * like caching the root /api call for a minute or so only
 * and doing lifetime cache for everythign else.
 * Probably redis/memcache in the future rather than locmem
 */
LocmemCache.prototype = {

    get: function(key, cb) {
        var maybeEntry = this.cache[key];
        if(maybeEntry && !this.isExpired(key)) {
            return cb(null, maybeEntry.data);
        }
        return cb();
    },

    set: function(key, value, ttl, cb) {
        this.cache[key] = {
            data: value,
            expiredIn: ttl ? (Date.now() + (ttl * 1000)) : 0
        };

        return cb();
    },

    isExpired: function(key) {
        var entry = this.cache[key];
        if(entry) {
            return entry.expiredIn !== 0 && entry.expiredIn < Date.now();
        } else {
            return false;
        }
    },

    remove: function(key, cb) {
        delete this.cache[key];
        return cb();
    },

    clear: function(key, cb) {
        this.cache = {};
        return cb();
    }
};

module.exports = new LocmemCache();
