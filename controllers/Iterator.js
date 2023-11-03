var IteratorLab = function (list) {
    this.index = 0;
    this.list = list;
}

IteratorLab.prototype = {
    first: function () {
        this.reset();
        return this.next();
    },
    next: function () {
        if (this.hasNext()) {
            return this.list[this.index++];
        }
        return null; 
    },
    hasNext: function () {
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

