export interface SignIn {
  email: string;
  username: string;
}

export interface IncomingSignUp {
  email: string;
  username: string;
  profileImg: string;
}

export interface UserType extends IncomingSignUp {
  id: number;
}
