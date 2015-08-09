var siteContent, extend = function (child, parent) {
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

siteContent = (function (superClass) {
    extend(siteContent, superClass);

    function siteContent() {
        return siteContent.__super__.constructor.apply(this, arguments);
    }

    siteContent.register("siteContent");

    siteContent.prototype.insertDOMElement = function (parent, node, before) {
        var opts;
        opts = {};
        if (node.classList.contains("display-inline-block")) {
            opts.display = "inline-block";
        }
        $(node).velocity("transition.fadeIn", opts);
        return siteContent.__super__.insertDOMElement.apply(this, arguments);
    };

    return siteContent;

})(Apollos.Component);