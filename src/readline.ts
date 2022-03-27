import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("close", function () {
  process.exit();
});

export function question(query?: string) {
  return new Promise<string>(function (resolve) {
    rl.question(query || "input: ", function (input) {
      resolve(input);
    });
  });
}
