export const binaryOperators = [
  "+",
  "-",
  "*",
  "/",
  "%",
  "==",
  ">",
  "<",
  ">=",
  "<=",
  "|",
  "&",
  "^",
  "<->",
  "<^>",
] as const;

export const unaryOperators = [
  ".",
  "@",
  "!",
] as const;

export const ternaryOperators = [
  "<<<",
] as const;

export const CONDITIONAL_IF = "?" as const;
export const CONDITIONAL_ELSE = ":" as const;

export type TernaryOperator = typeof ternaryOperators[number];
export type BinaryOperator = typeof binaryOperators[number];
export type UnaryOperator = typeof unaryOperators[number];
export type ConditionalIf = typeof CONDITIONAL_IF;
export type ConditionalElse = typeof CONDITIONAL_ELSE;

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

export const STACK = "STACK" as const;

export const TAKE_CONSUMES = "TAKE_CONSUMES" as const;

export const VAR_DECLARATION = "[]" as const;

export type VariableDefName = `${typeof VAR_DECLARATION}${string}`;

export type Consumes = typeof STACK | typeof TAKE_CONSUMES;

export type VariableName = `${VariableOperation}${string}`;

interface VariableDefToken {
  type: "VARIABLE_DEF";
  value: VariableDefName;
  name: string;
}

interface VariableToken {
  type: "VARIABLE";
  value: VariableName;
  consumes: Consumes;
  name: string;
  operation: VariableOperation;
}

export const STRING_QUOTE = '"';

export type StringType =
  `${typeof STRING_QUOTE}${string}${typeof STRING_QUOTE}`;

export interface StringToken {
  type: "STRING";
  value: StringType;
}

interface LeftBracketToken {
  type: "LEFT_BRACKET";
  value: "{";
}

interface RightBracketToken {
  type: "RIGHT_BRACKET";
  value: "}";
}

interface ConditionalIfToken {
  type: "CONDITIONAL_IF";
  value: ConditionalIf;
}

interface ConditionalElseToken {
  type: "CONDITIONAL_ELSE";
  value: ConditionalElse;
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
  | VariableDefToken
  | VariableToken
  | LeftBracketToken
  | RightBracketToken
  | ConditionalIfToken
  | ConditionalElseToken
  | FunctionToken
  | StringToken
  | UnknownToken;

interface BaseToken {
  lineNumber: number;
  errors: string[];
}

export type Token = TokenType & BaseToken;

/**
 * NODES -> STATEMENT (NODES | <EMPTY>)
 *
 * STATEMENT -> (FUNCTION_DEF | VAR_DEF | EXPRESSION)
 *
 * EXPRESSION -> (NUMBER | FUNCTION_CALL | VAR | OPERATOR | CONDITIONAL | STRING)
 *
 * STRING -> '"'FORMAT_STRING'"'
 *
 * FORMAT_STRING -> <ASCII CHARACTERS> | TAKE_FROM_STACK | ESCAPE_CHARACTERS | FORMAT_STRING | <EMPTY>
 *
 * TAKE_FROM_STACK -> {INTEGER}
 *
 * ESCAPE_CHARACTERS -> ESCAPE ('"' | '{' | '}' '\')
 *
 * ESCAPE -> '\'
 *
 * VAR_DEF -> []VAR_NAME
 *
 * VAR -> CONSUMES ->VAR_NAME
 *
 * VAR -> CONSUMES <-VAR_NAME
 *
 * CONSUMES -> (INTEGER | "STACK") // "STACK" indicates all
 *
 * VAR_NAME -> NAME
 *
 * OPERATOR -> (BINARY_OPERATOR | UNARY_OPERATOR)
 *
 * FUNCTION_CALL -> EXPRESSION<N> FUNCTION_NAME
 *
 * BINARY_OPERATOR -> EXPRESSION<2> ('+' | '-' | '*' | '/' | '%' | '==')
 *
 * UNARY_OPERATOR -> EXPRESSION<1> ('.', '@', '!')
 *
 * EXPRESSION[N] -> ((EXPRESSION EXPRESSION<N - 1>) | <EMPTY><N IS 0>)
 *
 * CONDITIONAL -> EXPRESSION<1> '?' BLOCK ( ELSE )
 * 
 * ELSE -> (':' BLOCK ) | <EMPTY>
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

export type ComputeBlockParent = ComputeBlock | null;

export interface ComputeBlock {
  parent: ComputeBlockParent;
  nodes: Nodes;
  pointer: number;
  scope: Scope;
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
  nodes: Nodes;
}

export type Fragment = string | number;

export type Fragments = Fragment[];

export interface StringNode {
  type: "STRING";
  value: StringType;
  fragments: Fragments;
}

export interface VariableNode {
  type: "VARIABLE";
  consumes: Consumes;
  name: string;
  operation: VariableOperation;
}

export interface VariableDefNode {
  type: "VARIABLE_DEF";
  name: string;
}

export interface FunctionCallNode {
  type: "FUNCTION_CALL";
  value: string;
}

export interface ConditionalNode {
  type: "CONDITIONAL";
  if_nodes: Nodes;
  else_nodes: Nodes;
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
  | StringNode
  | VariableDefNode
  | VariableNode
  | OperatorNode
  | ConditionalNode;

interface BaseNode {
  lineNumber: number;
}

export type ExpressionNode = NodeType & BaseNode;
