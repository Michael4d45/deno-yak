import { Fragment, StringToken } from "../types.ts";

export const buildStringFragments = (token: StringToken) => {
  const input = token.value.slice(1, -1);

  const outputArray: Fragment[] = [];

  // Matches {INTEGER}, ignores escaped braces
  const replaceReg = /(?<!\\)\{[0-9]+\}/g

  // Match placeholders in the input string
  const placeholders = input.match(replaceReg) || [];
  // Match regular text in the input string
  const textParts = input.split(replaceReg);

  // Iterate over both arrays in parallel and add items to the output array
  let i = 0;
  textParts.forEach((part) => {
    // Replace escaped quotes with unescaped quotes
    part = part.replace(/\\"/g, '"');
    outputArray.push(part.replace(/\\\{/g, "{").replace(/\\\}/g, "}"));
    if (i < placeholders.length) {
      const placeholder = placeholders[i];
      outputArray.push(Number(placeholder.slice(1, -1)));
      i++;
    }
  });

  return outputArray;
};
