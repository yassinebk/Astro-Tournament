import token from "json-web-token";
import { User } from "./src/entities/User";
export interface MyContext {
  currentUser: User | null;
}
