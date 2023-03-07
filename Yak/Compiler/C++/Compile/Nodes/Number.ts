const calculateNumber = (num: number, spaces: string) => {
  let cNum = `${num}`;

  if (!cNum.includes(".")) {
    cNum = `${cNum}.0`;
  }

  return `${spaces}_STACK.push_back(${cNum});`;
};

export default calculateNumber;
