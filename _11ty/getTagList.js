// JSON.decycle = require('json-cycle').decycle

module.exports = function(collection) {
  let tagSet = new Set();
  // console.log(JSON.stringify(JSON.decycle(collection), null, 2))
  collection.getAllSorted().forEach(function(item) {
    if ( "tags" in item.data ) {
      let tags = item.data.tags;
      if( typeof tags === "string" ) {
        tags = [tags];
      }

      tags = tags.filter( item => !item.startsWith('_'))

      for (const tag of tags) {
        tagSet.add(tag);
      }
    }
  });

  // returning an array in addCollection works in Eleventy 0.5.3
  return [...tagSet];
};
