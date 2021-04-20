const core = require('@actions/core');
const github = require('@actions/github');
var Git = require("nodegit");


const repoPath = process.env.GITHUB_WORKSPACE || '';
core.info(`Checking for changes in '${repoPath}'`);
const repo = await Repository.open(repoPath);
const status = await repo.getStatus();  
