import { Stack } from "../../../../types.ts";

export const testArgLength = (expect: number, stack: Stack, name: string) => {
  if (stack.length < expect) {
    throw new Error(
      `Expected ${expect} on stack for '${name}', got ${stack.length}`,
    );
  }
};
