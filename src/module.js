const shell = require("shelljs");
const { exec, exit } = shell;
const { printer, pipeline } = require("./utils");

const onList = (option) => {
  const { r, a } = option;
  if (a) {
    exec(`git branch -a`);
  } else if (r) {
    exec(`git branch -r`);
  } else {
    exec(`git branch`);
  }
  exit(1);
};

const onDelete = (branchName) => {
  exec(`git branch -D ${branchName}`);
  exit(1);
};

const onInvertDelete = () => {
  const stableBranchs = process.argv.splice(2);
  const { stdout } = exec("git symbolic-ref --short -q HEAD");
  stableBranchs.push(stdout);
  const { stdout: localBranchs } = exec("git branch");
  const deleteBranchs = localBranchs
    .split("\n")
    .map((item) => item.replace(/\s+/g, ""))
    .filter(
      (item) => item && !stableBranchs.includes(item) && !item.startsWith("*")
    );
  if (deleteBranchs.length > 0) {
    printer(deleteBranchs, "green");
    pipeline.question(
      `Are you sure to delete the above branches(y/n)?`,
      (check) => {
        if (["y", "Y"].includes(check)) {
          deleteBranchs.forEach((branch) => {
            exec(`git branch -D ${branch}`);
          });
        }
        pipeline.close();
        exit(1);
      }
    );
  } else {
    printer(`There are no branches to delete`, "green");
    exit(1);
  }
};

const onAdd = (path) => {
  if (path) {
    exec(`git add ${path}`);
  } else {
    exec(`git add .`);
  }
  exit(1);
};

const onCommit = (commitInfo) => {
  exec(`git commit -m '${commitInfo}'`);
  exit(1);
};

const onCheckout = (branch) => {
  exec(`git checkout ${branch}`);
  exit(1);
};

const onCheckoutB = (branch) => {
  exec(`git checkout -b ${branch}`);
  exit(1);
};

const onPush = () => {
  exec(`git push`);
  exit(1);
};

const onPull = () => {
  exec(`git pull`);
  exit(1);
};

const onPushRemote = (branch) => {
  if (branch) {
    exec(`git push --set-upstream origin ${branch}`);
  } else {
    exec(`git push origin HEAD`);
  }
  exit(1);
};

const onReset = (commitId) => {
  exec(`git reset ${commitId}`);
  exit(1);
};

module.exports = {
  onList,
  onDelete,
  onInvertDelete,
  onAdd,
  onCommit,
  onReset,
  onPush,
  onCheckout,
  onPushRemote,
  onPull,
  onCheckoutB,
};
