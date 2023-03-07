import { functionTemplate, operationTemplate } from "./Functions.ts";


const notTemplate = () =>
  operationTemplate("not", `(first != 0.0f ) ? 0.0f : 1.0f`, 1);

const not = { op: "!", name: "not", template: notTemplate };

const removeTemplate = () => functionTemplate("remove", "", 1);

const remove = { op: "@", name: "remove", template: removeTemplate };

const dupeResult = `
    _STACK.push_back(first);

    _STACK.push_back(first);
`;

const dupeTemplate = () => functionTemplate("dupe", dupeResult, 1);

const dupe = { op: ".", name: "dupe", template: dupeTemplate };

export const unaryOperations = [
  not,
  remove,
  dupe,
] as const;

const UnaryFunctions = () => {
  const c: string[] = [];

  unaryOperations.forEach(({ template }) => c.push(template()));

  return c;
};

export default UnaryFunctions;
