"use strict";

function MyEnumListener() {
    CPP14Listener.call(this);
    return this;
}

MyEnumListener.prototype = Object.create(CPP14Listener.prototype);
MyEnumListener.prototype.constructor = MyEnumListener;

MyEnumListener.prototype.enterEnumspecifier = function (ctx) {
    console.log("Oh, a enum!");
};

exports.MyEnumListener = MyEnumListener;