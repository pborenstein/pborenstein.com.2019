const decycle = require('json-cycle').decycle
const debug = require("debug")("catlist");

module.exports = function(collection) {
  let catSet = new Set();
  debug(JSON.stringify(decycle(collection), null, 2))
  collection.getAllSorted().forEach(function(item) {
    if( "categories" in item.data ) {
      let categories = item.data.categories;
      if( typeof categories === "string" ) {
        categories = [categories];
      }

      for (const category of categories) {
        catSet.add(category);
      }
    }
  });

  // returning an array in addCollection works in Eleventy 0.5.3
  debug([...catSet])
  return [...catSet];
};
