(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var dom;

dom = {
  matches: function(node, selector) {
    return node.webkitMatchesSelector(selector);
  },
  all: function(selector, scope) {
    if (scope == null) {
      scope = document;
    }
    return Array.prototype.slice.apply(scope.querySelectorAll(selector));
  },
  one: function(selector, scope) {
    if (scope == null) {
      scope = document;
    }
    return scope.querySelector(selector);
  },
  closest: function(node, selector) {
    while (node !== document) {
      if (node.webkitMatchesSelector(selector)) {
        return node;
      }
      node = node.parentNode;
    }
  },
  children: function(node, selector) {
    if (selector == null) {
      selector = '*';
    }
    return Array.prototype.slice.apply(node.children).filter(function(child) {
      return child.webkitMatchesSelector(selector);
    });
  },
  find: function(node, selector) {
    return this.one(selector, node);
  },
  docDefer: function(selector, eventName, handler) {
    return document.addEventListener(eventName, function(event) {
      if (event.target.webkitMatchesSelector(selector)) {
        return handler(event);
      }
    });
  },
  trigger: function(eventName, node) {
    var event;
    event = new Event(eventName);
    return node.dispatchEvent(event);
  }
};

if (typeof module !== "undefined" && module !== null) {
  module.exports = dom;
} else {
  window.dom = dom;
}



},{}]},{},[1]);
