import { funcName } from "./Functions.ts";

const transferTop = {
  name: "transferTop",
  template: () => `
void ${funcName("transferTop")}(std::vector<double>& from, std::vector<double>& to) {
    int count = _TOP;
    std::vector<double> top(from.end() - count, from.end());
    to.insert(to.end(), top.rbegin(), top.rend());
    from.erase(from.end() - count, from.end());
}
`,
};

export const variableOperations = [
  transferTop,
] as const;

const VariableFunctions = () => {
  const c: string[] = [];

  variableOperations.forEach(({ template }) => c.push(template()));

  return c;
};

export default VariableFunctions;
