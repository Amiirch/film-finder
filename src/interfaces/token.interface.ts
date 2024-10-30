export default interface IToken {
  userId: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}
