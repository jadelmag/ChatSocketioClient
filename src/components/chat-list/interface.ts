import {
  UserDBInterface,
  UserSocketInterface,
} from "src/interfaces/user.interface";

export interface ChartListInterface {
  users: UserDBInterface[];
  loggedUsers: UserSocketInterface[];
  onListUser: (users: UserDBInterface[]) => void;
  onConversation: (email: string) => void;
}
