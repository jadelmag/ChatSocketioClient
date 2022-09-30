import { UserDBInterface } from "src/interfaces/user.interface";

export interface SearchInterface {
  users: UserDBInterface[];
  onListUser: (users: UserDBInterface[]) => void;
}
