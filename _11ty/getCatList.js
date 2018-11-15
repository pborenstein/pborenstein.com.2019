const decycle = require('json-cycle').decycle
const debug = require("debug")("catlist");

const propInObject = (p, o) => (p in o)

module.exports = function(collection) {
  let catSet = new Set()
  let decycled = JSON.stringify(decycle(collection), null, 2)
  let sortedCollection = collection.getAllSorted();

  debug(decycled)

  sortedCollection.forEach(function(item) {
    if (!propInObject("categories", item.data.collections)) {
      // no categories collection? make one
      item.data.collections.categories = {}
    }


    if (propInObject("categories", item.collections)) {
      if (typeof item.data.category === "string") {
        catSet.add(item.data.category)
      }
    }
  });

  // returning an array in addCollection works in Eleventy 0.5.3
  debug([...catSet])
  return [...catSet];
};
