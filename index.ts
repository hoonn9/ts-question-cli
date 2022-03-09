import { question } from "./readline";

async function start() {
  let fileQuestion = `input file(ts) name for solving (default: ./solve.ts)\ninput: `;
  while (true) {
    let fileName = "";
    try {
      fileName = await question(fileQuestion);

      if (fileName === "") {
        fileName = "./solve.ts";
      }

      await execSolve(fileName);
      fileQuestion = `input file(ts) name for solving (default: ./solve.ts)\ninput: `;
    } catch (error: any) {
      if (error.code === "MODULE_NOT_FOUND") {
        fileQuestion = `${fileName} does not exist. please try again.\ninput: `;
        continue;
      }
      break;
    }
  }
}

async function execSolve(fileName: string) {
  const file = await import(fileName);
  while (true) {
    const instance = new file.default();

    const result = await instance.solve();

    if (result) break;
  }
}

start();
