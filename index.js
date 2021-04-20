const core = require('@actions/core');
const github = require('@actions/github');
var Git = require("nodegit");

nodeGitTests();

async function nodeGitTests() {
  
  try {
    core.info('running nodeGitTests');
    const repoPath = process.env.GITHUB_WORKSPACE || '';
    core.info(`Checking for changes in '${repoPath}'`);
    const repo = await Git.Repository.open(repoPath);
    const statusFiles = await repo.getStatus();
    core.info(`status files count: '${statusFiles.length}'`)
    for (const file of statusFiles) {
      core.info(`Status: ${file.status()} - ${file.path()}}`);
    }

    const index = await repo.refreshIndex();
    const changes = await index.writeTree();
    const parent = await repo.getCommit('HEAD');
    const authorSig = Signature.now(authorName, authorEmail);
    const committer = Signature.now(authorName, authorEmail);
    const commitId = await repo.createCommit(
      'HEAD',
      authorSig,
      committer,
      msg,
      changes,
      [parent]
    );
    const commit = await repo.getCommit(commitId);
    core.info(`Commited files. New sha: ${commit.sha()}`);
    core.setOutput('sha', commit.sha());
  } catch(err) {
    core.info(err);
  }
}
