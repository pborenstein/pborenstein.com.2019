//  We want to create an object
//  that has a property for each category.
//  The value of each property is a list
//  of articles in that category

module.exports = function(collection) {
  let categories = {}

  collection.getAllSorted().forEach(item => {
    let category = item.data.category
    if (typeof category !== "string")
      return

    categories[category] = categories[category] || []
    categories[category] = [...categories[category], item]

    // above is cleverer but below is readabler
    // if (Array.isArray(categories[category]))
    //   categories[category].push(item)
    // else
    //   categories[category] = [item]
  })

  return categories
}
