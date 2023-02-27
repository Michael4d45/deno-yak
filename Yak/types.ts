export const binaryOperators = [
  "+",
  "-",
  "*",
  "%",
  "==",
  "|",
  "&",
  "^",
  "<->",
  "<^>",
] as const;

export const unaryOperators = [
  ".",
  "@",
] as const;

export const ternaryOperators = [
  "<<<",
] as const;

export const conditionalOperators = [
  "?",
  "!",
] as const;

export type TernaryOperator = typeof ternaryOperators[number];
export type BinaryOperator = typeof binaryOperators[number];
export type UnaryOperator = typeof unaryOperators[number];
export type Conditional = typeof conditionalOperators[number];

interface NumberToken {
  type: "NUMBER";
  value: number;
}

type OperatorToken =
  | BinaryOperatorToken
  | UnaryOperatorToken
  | TernaryOperatorToken;

interface BinaryOperatorToken {
  type: "BINARY_OPERATOR";
  value: BinaryOperator;
}

interface TernaryOperatorToken {
  type: "TERNARY_OPERATOR";
  value: TernaryOperator;
}

interface UnaryOperatorToken {
  type: "UNARY_OPERATOR";
  value: UnaryOperator;
}

export const nameReg = /^[A-Za-z][A-Za-z_]*$/;

export type FunctionIdentifier = `${number}#${string}`;

interface IdentifierToken {
  type: "IDENTIFIER";
  value: FunctionIdentifier;
  arity: number;
  name: string;
}

export const variableOperations = [
  "->",
  "<-",
] as const;

export type VariableOperation = typeof variableOperations[number];

export type VariableName = `${number}${VariableOperation}${string}`;

export type Consumes = number | "ALL";

interface VariableToken {
  type: "VARIABLE";
  value: VariableName;
  consumes: Consumes;
  name: string;
  operation: VariableOperation;
}

interface LeftBracketToken {
  type: "LEFT_BRACKET";
  value: "{";
}

interface RightBracketToken {
  type: "RIGHT_BRACKET";
  value: "}";
}

interface ConditionalToken {
  type: "CONDITIONAL";
  value: Conditional;
}

interface FunctionToken {
  type: "FUNCTION_CALL";
  value: string;
}

interface UnknownToken {
  type: "UNKNOWN";
  value: string;
}

export type TokenType =
  | NumberToken
  | OperatorToken
  | IdentifierToken
  | VariableToken
  | LeftBracketToken
  | RightBracketToken
  | ConditionalToken
  | FunctionToken
  | UnknownToken;

interface BaseToken {
  lineNumber: number;
  errors: string[];
}

export type Token = TokenType & BaseToken;

/**
 * NODES -> STATEMENT (NODES | <EMPTY>)
 *
 * STATEMENT -> (FUNCTION_DEF | EXPRESSION)
 *
 * EXPRESSION -> (NUMBER | FUNCTION_CALL | VAR | OPERATOR | CONDITIONAL)
 *
 * VAR -> CONSUMES->VAR_NAME
 *
 * VAR -> CONSUMES<-VAR_NAME
 * 
 * CONSUMES -> (INTEGER | <EMPTY>) // EMPTY indicates all
 *
 * VAR_NAME -> NAME
 *
 * OPERATOR -> (BINARY_OPERATOR | UNARY_OPERATOR)
 *
 * FUNCTION_CALL -> EXPRESSION<N> FUNCTION_NAME
 *
 * BINARY_OPERATOR -> EXPRESSION<2> ('+' | '-' | '*' | '/' | '%' | '==')
 *
 * UNARY_OPERATOR -> EXPRESSION<1> ('.')
 *
 * EXPRESSION[N] -> ((EXPRESSION EXPRESSION<N - 1>) | <EMPTY><N IS 0>)
 *
 * CONDITIONAL -> EXPRESSION<1> '?' BLOCK
 *
 * FUNCTION_DEF -> IDENTIFIER BLOCK
 *
 * IDENTIFIER -> ARITY'#'FUNCTION_NAME
 *
 * ARITY -> <INTEGER>
 *
 * FUNCTION_NAME -> NAME
 *
 * NAME -> ALPHA(MIX)
 *
 * MIX -> (ALPHA | '_')(MIX | <EMPTY>)
 *
 * BLOCK -> '{' NODES '}'
 */

export type Stack = number[];

export type ComputeBlockParent = ComputeBlock | null

export interface ComputeBlock {
  parent: ComputeBlockParent;
  nodes: Nodes;
  pointer: number;
  scope: Scope;
}

export interface ASTBlock {
  parent: ASTBlock | null;
  nodes: Nodes;
}

interface Scope {
  functions: { [name: string]: FunctionDefNode };
  variables: { [name: string]: Stack };
}

export type Nodes = ExpressionNode[];

export interface FunctionDefNode {
  type: "FUNCTION_DEF";
  name: string;
  arity: number;
  block: ASTBlock;
}

export interface VariableNode {
  type: "VARIABLE";
  consumes: Consumes;
  name: string;
  operation: VariableOperation;
}

interface FunctionCallNode {
  type: "FUNCTION_CALL";
  value: string;
}

export interface ConditionalNode {
  type: "CONDITIONAL";
  value: Conditional;
  block: ASTBlock;
}

interface NumberNode {
  type: "NUMBER";
  value: number;
}

type OperatorNode =
  | BinaryOperatorNode
  | UnaryOperatorNode
  | TernaryOperatorNode;

interface TernaryOperatorNode {
  type: "TERNARY_OPERATOR";
  value: TernaryOperator;
}

interface BinaryOperatorNode {
  type: "BINARY_OPERATOR";
  value: BinaryOperator;
}

interface UnaryOperatorNode {
  type: "UNARY_OPERATOR";
  value: UnaryOperator;
}

export type NodeType =
  | NumberNode
  | FunctionCallNode
  | FunctionDefNode
  | VariableNode
  | OperatorNode
  | ConditionalNode;

interface BaseNode {
  lineNumber: number;
}

export type ExpressionNode = NodeType & BaseNode;
