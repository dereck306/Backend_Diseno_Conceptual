var IteratorLab = function (list) {
    this.index = 0;
    this.list = list; // store the list of courses
}

// Modify the prototype of IteratorLab
IteratorLab.prototype = {
    first: function () {
        this.reset();
        return this.next();
    },
    next: function () {
        // Use this.list instead of this.items
        return this.list[this.index++];
    },
    hasNext: function () {
        // Use this.list.length instead of this.items.length
        return this.index < this.list.length;
    },
    reset: function () {
        this.index = 0;
    },
    each: function (callback) {
        for (var item = this.first(); this.hasNext(); item = this.next()) {
            callback(item);
        }
    }
}
module.exports = IteratorLab;
