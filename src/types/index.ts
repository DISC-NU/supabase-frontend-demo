export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  major: string;
  graduationYear: number;
  bio?: string;
  profilePicture?: string;
}

export interface AuthError {
  message: string;
}
