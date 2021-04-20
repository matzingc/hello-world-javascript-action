const core = require('@actions/core');
const github = require('@actions/github');
var Git = require("nodegit");

getRepo();

async function nodeGitTests() {
  core.info('running nodeGitTests');
  const repoPath = process.env.GITHUB_WORKSPACE || '';
  core.info(`Checking for changes in '${repoPath}'`);
  const repo = await Git.Repository.open(repoPath);
  const status = await repo.getStatus();
  core.info(status);
}
