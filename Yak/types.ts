export type BinaryOperator = "+" | "-" | "*" | "%" | "==";
export type UnaryOperator = ".";
export type Conditional = "?" | "!"

interface NumberToken {
  type: "NUMBER";
  value: number;
}

type OperatorToken = BinaryOperatorToken | UnaryOperatorToken;

interface BinaryOperatorToken {
  type: "BINARY_OPERATOR";
  value: BinaryOperator;
}

interface UnaryOperatorToken {
  type: "UNARY_OPERATOR";
  value: UnaryOperator;
}

interface IdentifierToken {
  type: "IDENTIFIER";
  value: string;
  arity: number;
  name: string;
}

interface LeftBracketToken {
  type: "LEFT_BRACKET";
}

interface RightBracketToken {
  type: "RIGHT_BRACKET";
}

interface ConditionalToken {
  type: "CONDITIONAL";
  value: Conditional;
}

interface FunctionToken {
  type: "FUNCTION_NAME";
  value: string;
}

export type Token =
  | NumberToken
  | OperatorToken
  | IdentifierToken
  | LeftBracketToken
  | RightBracketToken
  | ConditionalToken
  | FunctionToken;

/**
 * NODES -> STATEMENT (NODES | <EMPTY>)
 *
 * STATEMENT -> (FUNCTION_DEF | EXPRESSION)
 *
 * EXPRESSION -> (NUMBER | FUNCTION_CALL | OPERATOR | CONDITIONAL)
 *
 * OPERATOR -> (BINARY_OPERATOR | UNARY_OPERATOR)
 *
 * FUNCTION_CALL -> EXPRESSION[N] FUNCTION_NAME
 *
 * BINARY_OPERATOR -> EXPRESSION[2] ('+' | '-' | '*' | '/' | '%' | '==')
 *
 * UNARY_OPERATOR -> EXPRESSION[1] ('.')
 *
 * EXPRESSION[N] -> ((EXPRESSION EXPRESSION[N - 1]) | <EMPTY>[N IS 0])
 *
 * CONDITIONAL -> EXPRESSION[1] '?' BLOCK
 *
 * FUNCTION_DEF -> IDENTIFIER BLOCK
 *
 * IDENTIFIER -> ARITY'#'FUNCTION_NAME
 *
 * ARITY -> <INTEGER>
 *
 * FUNCTION_NAME -> ALPHA(MIX)
 *
 * MIX -> (ALPHA | '_')(MIX | <EMPTY>)
 *
 * BLOCK -> '{' NODES '}'
 */

type BlockParent = Block | null;

export interface Block {
  parent: BlockParent;
  scope: Scope;
}

interface Scope {
  nodes: Nodes;
  functions: { [name: string]: FunctionDefNode };
}

type Nodes = Statement[];

export type Statement = FunctionDefNode | ExpressionNode;

export interface FunctionDefNode {
  type: "FUNCTION_DEF";
  name: string;
  arity: number;
  block: Block;
}

interface FunctionCallNode {
  type: "FUNCTION_CALL";
  name: string;
}

export interface ConditionalNode {
  type: "CONDITIONAL";
  value: Conditional;
  block: Block;
}

interface NumberNode {
  type: "NUMBER";
  value: number;
}

type OperatorNode = BinaryOperatorNode | UnaryOperatorNode;

interface BinaryOperatorNode {
  type: "BINARY_OPERATOR";
  value: BinaryOperator;
}

interface UnaryOperatorNode {
  type: "UNARY_OPERATOR";
  value: UnaryOperator;
}

type ExpressionNode =
  | NumberNode
  | FunctionCallNode
  | OperatorNode
  | ConditionalNode;
