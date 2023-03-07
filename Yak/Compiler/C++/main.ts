import buildAST from "../../AST/parse.ts";
import tokenizer from "../../Tokenizer/index.ts";
import { Token } from "../../types.ts";
import compile from "./Compile/Compiler.ts";

// Get the filename from the command line arguments
const filename = Deno.args[0];

// Read the contents of the file
const text = Deno.readTextFileSync(filename);

// Log the contents to the console
// console.log(text);

// tokenize
const tokens = tokenizer(text);

const tokenErrors = tokens.filter((token: Token) => token.errors.length > 0);

if (tokenErrors.length) {
  console.error(tokenErrors);
}

const ast = buildAST(tokens);

// console.log(ast);

const c = compile(ast);

// console.log(c);

const encoder = new TextEncoder();
const data = encoder.encode(c);

await Deno.writeFile("out.cpp", data);

const comp = Deno.run({
  cmd: ["g++", "out.cpp", "-o", "out"],
});

await comp.status();

comp.close();

const test = Deno.run({
  cmd: ["./out.exe"],
});

await test.status();

test.close();
