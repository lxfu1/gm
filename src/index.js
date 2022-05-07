const commander = require("commander");
const pkg = require("../package.json");
const {
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
} = require("./module");

const program = new commander.Command("gm");

program.version(pkg.version);

program
  .command("b")
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

program.command("a [file]").description("Git add").action(onAdd);
program
  .command("cm <commit-info>")
  .description("Git commit information")
  .action(onCommit);

program.command("r <commit id>").description("Git reset").action(onReset);

program.command("p").description("Git push").action(onPush);
program
  .command("pr [branch]")
  .description("Git push origin")
  .action(onPushRemote);
program.command("pl").description("Git pull").action(onPull);

program.command("co <branch>").description("Git checkout").action(onCheckout);
program
  .command("cb <branch>")
  .description("Git checkout -b")
  .action(onCheckoutB);

program.parse(process.argv);
