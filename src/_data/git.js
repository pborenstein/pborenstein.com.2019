const git = require('async-git');
let commitsha = "sddn"

let dirty = "dirty"

module.exports = async function() {

 let ret =  {
   commitsha: await git.short,
   curbranch: await git.branch
 }

  return ret
}
