// https://forums.getdrafts.com/t/script-step-post-to-github-without-working-copy/3594

const credential = Credential.create("qNote repo", "GitHub repo");

credential.addTextField('username', "GitHub Username");
credential.addTextField('repo', 'Repo name');
credential.addPasswordField('key', "GitHub access token");

credential.authorize();

const githubKey = credential.getValue('key');
const githubUser = credential.getValue('username');
const repo = credential.getValue('repo');

const posttime = new Date()
const drafttime = draft.createdAt

const dateStr = date => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
const timeStr = date => `${pad(date.getHours())}:${pad(date.getMinutes())}`

const datestr = dateStr(posttime)
const timestr = timeStr(posttime)

const fname = `${dateStr(posttime)}-${timeStr(posttime)}.md`

const doc = `
---
date: ${dateStr(drafttime)}T${timeStr(drafttime)}
date-posted: ${dateStr(posttime)}T${timeStr(posttime)}
tags: [ "squibs" ]
title: ${dateStr(drafttime)}T${timeStr(drafttime)}
---

${draft.content}
`

const options = {
    url: `https://api.github.com/repos/${githubUser}/${repo}/contents/src/q/${fname}`,
    method: 'PUT',
    data: {
        message: `qNote created at ${dateStr(drafttime)}T${timeStr(drafttime)}`,
        content: Base64.encode(doc),
        branch: 'squibs'
    },
    headers: {
        'Authorization': `token ${githubKey}`
    }
};

var http = HTTP.create();
var response = http.request(options);

if (response.success) {
  app.displaySuccessMessage('Posted')
} else {
  app.displayErrorMessage(`Something went wrong (${response.statusCode})`)
    console.log(response.statusCode);
    console.log(response.error);
}

function pad(n) {
    let str = String(n);
    while (str.length < 2) {
        str = `0${str}`;
    }
    return str;
}
