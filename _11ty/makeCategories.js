const decycle = require('json-cycle').decycle
const debug = require("debug")("makeCategories");

//  We want to create an object
//  that has a property for each category.
//  The value of each property is a list
//  of articles in that category

module.exports = function(collection) {
  let decycled = JSON.stringify(decycle(collection), null, 2)
  let categories = {}

  debug(decycled)

  collection.getAllSorted().forEach(item => {
    let category = item.data.category
    if (typeof category !== "string")
      return

    if (Array.isArray(categories[category]))
      categories[category].push(item)
    else
      categories[category] = [item]
  })

  debug(categories)
  return categories
}
