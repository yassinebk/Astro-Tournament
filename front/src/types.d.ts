import { SetStateAction } from "react";

export interface idType {
  id: string;
}

type roleType = "ADMIN" | "PLAYER";
export interface User {
  id: string;
  username: string;
  password?: string;
  email: string;
  score: number;
  level: Level;
  role: roleType;
}

export interface Question {
  id: string;
  question: string;
  type: string;
  answer: string;
  multipleChoices?: string[];
  value: number;
}

export interface newQuestion extends Omit<Question, "id"> {
  id?: never;
}

export interface Level {
  id: string;
  number: number;
  questions: Question[];
}

export type NotifType = "SUCCESS" | "ERROR" | "INFO" | "OTHER";

export type SetNotification = Dispatch<SetStateAction<null | Notification>>;

export type Notification = {
  message: string;
  type: NotifType;
} | null;

export interface Error {
  message: string;
  code: success;
}

export type InputOnChange = (Event) => never;
export type InputClear = () => never;

export interface Input {
  value: string;
  type: string;
  setState: React.SetStateAction;
  onChange: InputOnChange;
  clear: InputClear;
}

export interface Class {
  props: string[];
}

export interface Token {
  value: string | null;
}
export interface Auth {
  user: User | null;
  token: Token | null;
}
export interface LoginArgs {
  variables: {
    username: string;
    password: string;
  };
}

export type SetTokenType = Dispatch<SetStateAction<null | string>>;
export type SetUserType = Dispatch<SetStateAction<null | User>>;
