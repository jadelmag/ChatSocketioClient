import { ContainerInterface } from "src/components/container/interfaces";
import "./container.scss";

export const ChatContainer = ({
  children,
}: ContainerInterface): JSX.Element => {
  return <div className="chat-container">{children}</div>;
};

export default ChatContainer;
