import { Processor } from "./process.ts";

// Get the filename from the command line arguments
const filename = Deno.args[0];

// Read the contents of the file
const text = Deno.readTextFileSync(filename);

const { yak } = Processor({ text });

const encoder = new TextEncoder();
const data = encoder.encode(yak);

await Deno.writeFile("out.yak", data);
