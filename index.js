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
    core.info(`1`);
    const changes = await index.writeTree();

    core.info(`2`);
    const parent = await repo.getCommit('HEAD');
    
    core.info(`3`);
    const authorSig = Signature.now(authorName, authorEmail);
    
    core.info(`4`);
    const committer = Signature.now(authorName, authorEmail);
    
    core.info(`5`);
    const commitId = await repo.createCommit(
      'HEAD',
      authorSig,
      committer,
      msg,
      changes,
      [parent]
    );
    core.info(`OID: ${commitId}`)
    const commit = await repo.getCommit(commitId);
    core.info(`Commited files. New sha: ${commit.sha()}`);
    core.setOutput('sha', commit.sha());
  } catch(err) {
    core.info(err);
  }
}
