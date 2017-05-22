"use strict";

function MyErrorListener() {
    ErrorListener.call(this);
    return this;
}

MyErrorListener.prototype = Object.create(ErrorListener.prototype);
MyErrorListener.prototype.constructor = MyErrorListener;

MyErrorListener.prototype.syntaxError = function(recognizer, offendingSymbol, line, column, msg, e) {
    console.error("Error: line " + line + ":" + column + " " + msg);
};

exports.MyErrorListener = MyErrorListener;