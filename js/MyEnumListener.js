"use strict";

function MyEnumListener() {
    CPP14Listener.call(this);
    this.elements = [];
    return this;
}

MyEnumListener.prototype = Object.create(CPP14Listener.prototype);
MyEnumListener.prototype.constructor = MyEnumListener;

MyEnumListener.prototype.enterEnumspecifier = function (ctx) {
    this.elements = [];
};

MyEnumListener.prototype.enterEnumerator = function (ctx) {
    var e = {name: ctx.getText(), value: Math.pow(2, this.elements.length), state: false};
    this.elements.push(e);
};

exports.MyEnumListener = MyEnumListener;