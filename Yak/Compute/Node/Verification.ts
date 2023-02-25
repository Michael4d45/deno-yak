import { Stack } from "./../types.d.ts";

export const testArgLength = (expect: number, stack: Stack, name: string) => {
  if (stack.length < expect) {
    throw new Error(
      `Expected ${expect} argument(s) for '${name}', got ${stack.length}`,
    );
  }
};
