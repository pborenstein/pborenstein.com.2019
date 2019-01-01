const decycle = require('json-cycle').decycle
const debug = require("debug")("catlist");

//  This version creates the category list
//  and the categories themselves
//  at the same time.
//  It's not very pretty, and it forces
//  the property name "categories"

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
        // no category slot for this category? make one
        item.data.collections.categories[item.data.category] = []
      }

      item.data.collections.categories[item.data.category].push(item)
    }
  });

  catlist = [...catSet]

  debug(catlist)
  return catlist
};
