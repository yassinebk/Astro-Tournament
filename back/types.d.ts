export type token = {
  username: string,
  id: string;
  email: token;
  score: token;
  level: Level

}


export interface Context {
  currentUser: User,
  token:string
}