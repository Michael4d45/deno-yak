import { Token } from "../types.ts";

export const getNodes = (tokens: Token[], pointer: number) => {
  if (
    tokens[pointer + 1] === undefined
  ) {
    tokens[pointer].errors.push("Expected block");
    throw new Error("Syntax error");
  }
  if (
    tokens[pointer + 1].type !== "LEFT_BRACKET"
  ) {
    tokens[pointer + 1].errors.push("Expected '{'");
    throw new Error("Syntax error");
  }
  let rightPointer = pointer + 1;
  let depth = 1;
  while (depth > 0 && tokens[++rightPointer] !== undefined) {
    const curToken = tokens[rightPointer];
    if (curToken.type === "RIGHT_BRACKET") {
      depth--;
    }
    if (curToken.type === "LEFT_BRACKET") {
      depth++;
    }
  }
  if (rightPointer >= tokens.length) {
    tokens[tokens.length - 1].errors.push("Expected '}'");
  }

  const newTokens = tokens.splice(pointer + 2, rightPointer - pointer - 2);
  tokens.splice(pointer + 1, 2);
  return newTokens;
};
