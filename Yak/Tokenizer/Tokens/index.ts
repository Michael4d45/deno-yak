import { PushTokenType, TestType } from "../types.ts";
import testBinaryOperator from "./BinaryOperator.ts";
import testConditional from "./Conditional.ts";
import testFunctionCall from "./FunctionCall.ts";
import testIdentifier from "./Identifier.ts";
import testLeftBracket from "./LeftBracket.ts";
import testNumber from "./Number.ts";
import testRightBracket from "./RightBracket.ts";
import testTernaryOperator from "./TernaryOperator.ts";
import testUnaryOperator from "./UnaryOperator.ts";
import unknown from "./Unknown.ts";

const tests: TestType[] = [
  testNumber,
  testUnaryOperator,
  testBinaryOperator,
  testTernaryOperator,
  testConditional,
  testLeftBracket,
  testRightBracket,
  testIdentifier,
  testFunctionCall,
  unknown,
];

const checkToken = (
  token: string,
  pushToken: PushTokenType,
) => tests.some((test) => test(token, pushToken));

export default checkToken;
