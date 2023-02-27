import { User } from './user.interface';

export interface Jwt {
  user: User; // ? means, it is optional
  token: string;
}
