const decycle = require('json-cycle').decycle
const debug = require("debug")("catlist");


module.exports = function(collection) {
  let catSet = new Set()
  let catlist = []
  let decycled = JSON.stringify(decycle(collection), null, 2)
  let sortedCollection = collection.getAllSorted()

  debug(decycled)

  sortedCollection.forEach(function(item) {
    if (! ("categories" in item.data.collections)) {
      // no categories collection? make one
      item.data.collections.categories = {}
    }

    if (typeof item.data.category === "string") {
      catSet.add(item.data.category)
      if (!Array.isArray(item.data.collections.categories[item.data.category])) {
        item.data.collections.categories[item.data.category] = []
      }

      item.data.collections.categories[item.data.category].push(item)
    }
  });

  catlist = [...catSet]

  // returning an array in addCollection works in Eleventy 0.5.3
  debug(catlist)
  return catlist
};
