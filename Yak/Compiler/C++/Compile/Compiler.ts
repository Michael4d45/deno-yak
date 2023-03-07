import { Nodes } from "../../../types.ts";
import { getFunctions } from "./Functions/Functions.ts";
import { getProcedure } from "./Nodes/index.ts";

const compile = (nodes: Nodes) => {
  const c: string[] = [
    `#include <vector>
#include <string>
#include <stdexcept>
#include <algorithm>
#include <iostream>
#include <numeric>
#include <variant>
#include <cmath>
#include <map>
#include <functional>
  
std::vector<double> _STACK = {};

double _TOP;

`,
    ...getFunctions(),
    `

int main() {
`,
...getProcedure(nodes).map(line => `${line}\n`),
    `
    return 0;
}`,
  ];

  return c.join("");
};

export default compile;
