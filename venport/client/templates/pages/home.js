var home, extend = function (child, parent) {
    for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
    }
    function ctor() {
        this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
},
    hasProp = {}.hasOwnProperty;

home = (function (superClass) {
    extend(home, superClass);

    function home() {
        return home.__super__.constructor.apply(this, arguments);
    }

    home.register("home");

    home.prototype.vars = function () {
        return [{
            asteroidCount: 0,
            animationsFinished: false
        }];
    };

    home.prototype.asteroids = function () {
        var asteroids, i, ref, results, self;
        self = this;
        if (self.asteroidCount.get() === 0) {
            return [];
        }
        asteroids = (function () {
            results = [];
            for (var i = 1, ref = self.asteroidCount.get(); 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {
                results.push(i);
            }
            return results;
        }).apply(this).map(function (v) {
            var left;
            left = Math.floor(Math.random() * 101);
            return {
                top: "110%",
                left: left + "%",
                name: "asteroid-" + left
            };
        });
        return asteroids;
    };

    home.prototype.bindProjects = function () {
        var childHeight, horizontal, i, item, itemHeight, itemWidth, items, len, newWidth, numOfItems, self;
        self = this;
        horizontal = self.$("[data-horizontal]");
        itemWidth = horizontal[0].offsetWidth;
        itemHeight = horizontal[0].offsetHeight;
        childHeight = 0;
        items = horizontal.find("[data-horizontal-item]");
        for (i = 0, len = items.length; i < len; i++) {
            item = items[i];
            if (item.offsetHeight > childHeight) {
                childHeight = item.offsetHeight;
            }
            item.style.width = item.offsetWidth + "px";
        }
        numOfItems = items.length;
        newWidth = numOfItems * itemWidth * .8;
        horizontal[0].style.width = newWidth + "px";
        horizontal[0].style.height = childHeight + "px";
        horizontal[0].style["white-space"] = "nowrap";
        return horizontal[0].style["overflow-x"] = "auto";
    };

    home.prototype.floatCenter = function () {
        var floatingElement, height, rect, self, width;
        self = this;
        floatingElement = self.$("[data-float-center]");
        floatingElement[0].style.fontSize = "4.444em";
        width = isNaN(window.innerWidth) ? window.clientWidth : window.innerWidth;
        height = isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
        rect = floatingElement[0].getBoundingClientRect();
        height = (height / 2) - (floatingElement[0].offsetHeight / 2);
        floatingElement[0].style.position = "absolute";
        floatingElement[0].style.top = height + "px";
        return floatingElement[0].style.transition = "font 0.6s ease";
    };

    home.prototype.onRendered = function () {
        var self;
        self = this;
        self.floatCenter();
        Meteor.setTimeout(function () {
            return self.asteroidCount.set(30);
        }, 1000);
        self.autorun(function (computation) {
            if (self.animationsFinished.get()) {
                return Meteor.setTimeout(function () {
                    return self.bindProjects();
                }, 100);
            }
        });
        return self.autorun(function (computation) {
            var count;
            count = self.asteroidCount.get();
            return Meteor.setTimeout(function () {
                var asteroid, asteroids, delay, finish, i, index, len, results;
                asteroids = self.$("[data-asteroid]");
                delay = 0;
                results = [];
                for (index = i = 0, len = asteroids.length; i < len; index = ++i) {
                    asteroid = asteroids[index];
                    delay = delay + Math.floor(Math.random() * 101);
                    finish = self.clean;
                    if (index === asteroids.length - 1) {
                        finish = function (nodes) {
                            return self.clean(nodes, function () {
                                var floatingElement, newHeight, rect;
                                floatingElement = self.$("[data-float-center]");
                                rect = floatingElement[0].getBoundingClientRect();
                                newHeight = rect.top - floatingElement[0].offsetHeight;
                                return floatingElement.velocity({
                                    top: "0",
                                    fontSize: "1em"
                                }, {
                                    duration: 600,
                                    complete: function () {
                                        self.animationsFinished.set(true);
                                        return computation.stop();
                                    }
                                });
                            });
                        };
                    }
                    results.push($(asteroid).velocity({
                        translateY: "-1500px",
                        opacity: 1
                    }, {
                        duration: 600,
                        delay: delay,
                        complete: finish
                    }));
                }
                return results;
            }, 100);
        });
    };

    home.prototype.clean = function (nodes, callback) {
        var element, i, len;
        for (i = 0, len = nodes.length; i < len; i++) {
            element = nodes[i];
            element.parentNode.removeChild(element);
        }
        if (typeof callback === "function") {
            return callback();
        }
    };

    return home;

})(Apollos.Component);