const decycle = require('json-cycle').decycle
const debug = require("debug")("catlist");


module.exports = function(collection) {
  let decycled = JSON.stringify(decycle(collection), null, 2)
  let sortedCollection = collection.getAllSorted()

  debug(decycled)

  sortedCollection.forEach(function(item) {
    if (typeof item.data.category === "string") {
      if (!Array.isArray(item.data.collections.categories[item.data.category])) {
        item.data.collections.categories[item.data.category] = []
      }

      item.data.collections.categories[item.data.category].push(item)
    }
  })
}
