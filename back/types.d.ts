import token from "json-web-token";
import { User } from "./src/entities/User";
export type token = {
  username: string;
  id: string;
  email: token;
  score: token;
  level: Level;
};

export interface MyContext {
  currentUser: User | null;
  token: token | null;
}
