dom =
  matches: (node, selector) ->
    node.webkitMatchesSelector(selector)

  all: (selector, scope = document) -> Array.prototype.slice.apply(scope.querySelectorAll(selector))
  one: (selector, scope = document) -> scope.querySelector(selector)

  closest: (node, selector) ->
    while node != document
      return node if node.webkitMatchesSelector(selector)
      node = node.parentNode

    return

  children: (node, selector) ->
    selector ?= '*'
    Array.prototype.slice.apply(node.children).filter (child) ->
      child.webkitMatchesSelector(selector)

  find: (node, selector) -> @one(selector, node)

  docDefer: (selector, eventName, handler) ->
    document.addEventListener eventName, (event) ->
      handler(event) if event.target.webkitMatchesSelector(selector)

  trigger: (eventName, node) ->
    event = new Event(eventName);
    node.dispatchEvent(event)

if module? then module.exports = dom else window.dom = dom
