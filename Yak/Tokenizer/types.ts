import { TokenType } from "../types.ts";

export type PushTokenType = (token: TokenType, error?: string) => void;

export type TestType = (token: string, pushToken: PushTokenType) => boolean;

export const functionNameReg = /^[A-Za-z][A-Za-z_]*$/;
