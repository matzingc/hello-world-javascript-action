const core = require('@actions/core');
const github = require('@actions/github');
var Git = require("nodegit");

nodeGitTests();

async function nodeGitTests() {
  core.info('running nodeGitTests');
  const repoPath = process.env.GITHUB_WORKSPACE || '';
  core.info(`Checking for changes in '${repoPath}'`);
  const repo = await Git.Repository.open(repoPath);
  const status = await repo.getStatus();
  core.info(status);
  for (const file of status) {
    core.info(`Status: ${file.status()} - ${file.path()}}`);
  }
}
