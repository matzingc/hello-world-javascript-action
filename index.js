const core = require('@actions/core');
const github = require('@actions/github');
var Git = require("nodegit");

async function run(): Promise<void> {
  const repoPath = process.env.GITHUB_WORKSPACE || '';
  core.info(`Checking for changes in '${repoPath}'`);
  const repo = await Repository.open(repoPath);
  const status = await repo.getStatus();  
}
