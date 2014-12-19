(function() {
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

}).call(this);
