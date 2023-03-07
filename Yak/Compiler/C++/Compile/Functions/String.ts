import { funcName } from "./Functions.ts";

const print = {
  name: "print",
  template: () => `
void ${funcName("print")}(int size, std::vector<std::variant<std::string, int>> fragments) {
    if (_STACK.size() < size) {
      std::string plural = size > 1 ? "s" : "";
      throw std::runtime_error("Error: stack does not have at least " + std::to_string(size) + " element" + plural + " for string.");
    }

    // const args = stack.splice(stack.length - computes).reverse();
    std::vector<double> args(size);
    std::copy_n(_STACK.rbegin(), size, args.begin());
    _STACK.erase(_STACK.end() - size, _STACK.end());

    // const replaced = fragments.map((fragment) => {
    //   if (typeof fragment === "string") return fragment;
    //   return args[fragment - 1];
    // });
    std::vector<std::string> replaced(fragments.size());
    std::transform(fragments.begin(), fragments.end(), replaced.begin(), [&args](auto fragment) -> std::string {
        if (std::holds_alternative<std::string>(fragment)) {
            return std::get<std::string>(fragment);
        }
        int arg_index = std::get<int>(fragment) - 1;
        return std::to_string(args[arg_index]);
    });

  
    // getBuffer().write(replaced.join(""));
    std::cout << std::accumulate(replaced.begin(), replaced.end(), std::string(""));
}
`,
};

export const stringOperations = [
  print,
] as const;

const StringFunctions = () => {
  const c: string[] = [];

  stringOperations.forEach(({ template }) => c.push(template()));

  return c;
};

export default StringFunctions;
