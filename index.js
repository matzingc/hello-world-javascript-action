const core = require('@actions/core');
const github = require('@actions/github');
var Git = require("nodegit");

console.log(process.env.GITHUB_WORKSPACE);
