import buildAST from "../../AST/parse.ts";
import tokenizer from "../../Tokenizer/index.ts";
import { Token } from "../../types.ts";
import compile from "./Compile/Compiler.ts";

interface Props {
  text: string;
}

export const Processor = ({ text }: Props) => {
  const tokens = tokenizer(text);

  const tokenErrors = tokens.filter((token: Token) => token.errors.length > 0);

  let yak = "";

  if (!tokenErrors.length) {
    const ast = buildAST(tokens);

    yak = compile(ast);
  }

  return { yak, tokenErrors };
};
