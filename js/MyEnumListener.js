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

MyEnumListener.prototype.enterEnumeratordefinition = function (ctx) {
    var name = ctx.enumerator().getText();
    var value = 0;
    if (ctx.constantexpression()) {
        value = parseInt(ctx.constantexpression().getText(), 16);
    } else {
        value = this.elements.length === 0 ? 0 : this.elements[this.elements.length - 1].value + 1;
    }
    this.elements.push({name: name, value: value, state: false});
};

exports.MyEnumListener = MyEnumListener;