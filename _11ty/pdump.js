const decycle = require('json-cycle').decycle
const debug = require("debug")("catlist");


module.exports = function pdump(obj) {
  let decycled = JSON.stringify(decycle(obj), null, 2)

  return decycled;
}
