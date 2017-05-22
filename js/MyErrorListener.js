"use strict";

function MyErrorListener() {
    ErrorListener.call(this);
    this.errors = [];
    return this;
}

MyErrorListener.prototype = Object.create(ErrorListener.prototype);
MyErrorListener.prototype.constructor = MyErrorListener;

MyErrorListener.prototype.syntaxError = function (recognizer, offendingSymbol, line, column, msg, e) {
    this.errors.push("line " + line + ":" + column + " " + msg);
};

exports.MyErrorListener = MyErrorListener;