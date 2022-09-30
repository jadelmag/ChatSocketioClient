import { ChatScreenInterface } from "src/components/chatscreen/interface";
import "./chatscreen.scss";

export const ChatScreen = ({ children }: ChatScreenInterface): JSX.Element => {
  return <div className="chat-screen">{children}</div>;
};

export default ChatScreen;
