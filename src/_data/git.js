const git = require('async-git');

module.exports = async function() {

 let ret =  {
   commitsha:   await git.short,
   curbranch:   await git.branch,
   reponame:    await git.name,
   commitdate:  await git.date
 }

  return ret
}
