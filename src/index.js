const shell = require("shelljs");
const commander = require("commander");
const { exec, exit } = shell;

const { printer } = require("./utils");

const pkg = require("../package.json");

const program = new commander.Command("gm");

program.version(pkg.version);

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
          console.log(`Deleted`);
        }
        pipeline.close();
      }
    );
  } else {
    printer(`There are no branches to delete`, "green");
  }
  exit(1);
};

program
  .command("l")
  .description("List all the branch")
  .option("-a", "all branch")
  .option("-r", "remote branch")
  .action(onList);

program
  .command("d <branch-name>")
  .description("Delete one branch")
  .action(onDelete);

program
  .command("D [branch-name]")
  .description("Delete all branchs exclude input [branchs] and  current branch")
  .action(onInvertDelete);

program.parse(process.argv);
