import { functionTemplate, operationTemplate } from "./Functions.ts";

const mathTemplate = (name: string, op: string) =>
  operationTemplate(name, `second ${op} first`, 2);

const modTemplate = () => {
  const operation = "static_cast<double>(int_second % int_first)";
  const check = `  
    // Check that the operands are integers
    if (std::floor(first) != first || std::floor(second) != second) {
      throw std::runtime_error("Error: operands must be integers.");
    }

    // Apply the operator and push the result back onto the stack
    int int_first = static_cast<int>(first);
    int int_second = static_cast<int>(second);
`;
  return operationTemplate(mod.name, operation, 2, check);
};

const compTemplate = (name: string, op: string) =>
  operationTemplate(name, `second ${op} first ? 1.0f : 0.0f`, 2);

const logicTemplate = (name: string, op: string) =>
  operationTemplate(
    name,
    `(first != 0.0f ) ${op} (second != 0.0f ) ? 1.0f : 0.0f`,
    2,
  );

const mathOps = [
  { op: "+", name: "add" },
  { op: "-", name: "sub" },
  { op: "*", name: "multiply" },
  { op: "/", name: "divide" },
].map((operation) => ({
  ...operation,
  template: () => mathTemplate(operation.name, operation.op),
}));

const mod = { op: "%", name: "mod", template: modTemplate } as const;

const comparatorOps = [
  { op: "==", name: "equal" },
  { op: ">", name: "gt" },
  { op: "<", name: "lt" },
  { op: ">=", name: "gte" },
  { op: "<=", name: "lte" },
].map((operation) => ({
  ...operation,
  template: () => compTemplate(operation.name, operation.op),
}));

const logicOps = [
  { op: "|", cop: "||", name: "or" },
  { op: "&", cop: "&&", name: "and" },
  { op: "^", cop: "^", name: "xor" },
].map((operation) => ({
  ...operation,
  template: () => logicTemplate(operation.name, operation.cop),
}));

const swapResult = `
    _STACK.push_back(first);

    _STACK.push_back(second);
`;

const overResult = `
    _STACK.push_back(first);

    _STACK.push_back(second);

    _STACK.push_back(first);
`;

const swapTemplate = () => functionTemplate("swap", swapResult, 2);

const overTemplate = () => functionTemplate("over", overResult, 2);

const exchangeOps = [
  { op: "<->", name: "swap", template: swapTemplate },
  { op: "<^>", name: "over", template: overTemplate },
];

export const binaryOperations = [
  ...mathOps,
  ...comparatorOps,
  mod,
  ...logicOps,
  ...exchangeOps,
] as const;

const BinaryFunctions = () => {
  const c: string[] = [];

  binaryOperations.forEach(({ template }) => c.push(template()));

  return c;
};

export default BinaryFunctions;
