// https://forums.getdrafts.com/t/script-step-post-to-github-without-working-copy/3594

const credential = Credential.create("gitlab repo", "gitlab repo");

credential.addTextField('username', "Username")
credential.addTextField('repo', 'Repo')
credential.addPasswordField('key', "access token")
credential.authorize()

const gitKey  = credential.getValue('key')
const gitUser = credential.getValue('username')
const repo    = credential.getValue('repo')

const posttime  = new Date()
const drafttime = draft.createdAt

const dateStr = date => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
const timeStr = date => `${pad(date.getHours())}:${pad(date.getMinutes())}`
const fname = `${dateStr(posttime)}-${timeStr(posttime)}.md`

const doc = `---
date: ${dateStr(posttime)}T${timeStr(posttime)}
draftDate: ${dateStr(drafttime)}T${timeStr(drafttime)}
category: Q
tags: _q
title: ${dateStr(drafttime)}T${timeStr(drafttime)}
---

${draft.content}
`

function pad(n) {
  let str = String(n);
  while (str.length < 2)
    str = `0${str}`;
  return str;
}


var http = HTTP.create();

const getProject = {
    url: `https://gitlab.com/api/v4/projects/${gitUser}%2F${repo}`,
    method: 'GET',
    headers: { 'Private-Token': `${gitKey}` }
}

response = http.request(getProject)

if (response.statusCode != 200) {
  context.fail();
  console.log("Error: " + response.error);
//   return null;
}
let data = JSON.parse(response.responseText);
if (!data) {
  context.fail();
  console.log("Error: Unable to parse response");
//   return null;
}

if (!data.id) {
  context.fail();
  console.log("Error: Unable to get id");
//   return null;
}

const repoID = data.id
const filename = `src%2Fq%2F${fname}`

let createFile = {
  url: `https://gitlab.com/api/v4/projects/${repoID}/repository/files/${filename}`,
  method: 'POST',
  headers: { 'Private-Token': gitKey },
  data: {
    file_path: filename,
    commit_message: `qNote created at ${dateStr(drafttime)}T${timeStr(drafttime)}`,
    encoding: 'base64',
    content: Base64.encode(doc),
    branch: 'squibs'
  }
}

response = http.request(createFile)

if (response.statusCode >= 200)
  app.displaySuccessMessage('Posted')
else
  app.displayErrorMessage(`Something went wrong (${response.statusCode})`)

