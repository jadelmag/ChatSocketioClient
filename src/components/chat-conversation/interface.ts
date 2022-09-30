import { UserDBInterface } from "src/interfaces/user.interface";

export interface ChatConversationInterface {
  user: UserDBInterface;
  socket: any;
}
