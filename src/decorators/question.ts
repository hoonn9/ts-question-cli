import { question } from "../readline";

export function Question(title?: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      title = title;
      constructor(...args: any[]) {
        super(args);
      }
    };
  };
}

type SolveArgs = {
  title?: string;
  inputCount: number;
  expectOutput: string;
};

export function Solve(args: SolveArgs) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let oldFunc = descriptor.value;
    descriptor.value = async function () {
      if (args.title) {
        console.log(`Q) ${args.title}\n`);
      }

      let input: string | string[];

      if (args.inputCount > 1) {
        input = [];
        for (let i = 0; i < args.inputCount; i++) {
          input.push(await question("input: "));
        }
      } else {
        input = await question("input: ");
      }

      console.time("executing time");
      const result = oldFunc(input);
      console.timeEnd("executing time");

      if (result === args.expectOutput) {
        console.log(`correct!\n`);
        return true;
      }

      console.log(`not correct. expect output: ${args.expectOutput}\n`);

      return false;
    };
  };
}
