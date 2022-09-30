import { ChartUserInterface } from "src/components/chat-user/interface";
import ImagePNG from "src/assets/default.png";
import "./chat-user.scss";

export const ChatUser = ({
  username,
  email,
  image,
  logged = false,
  onSelectedConversation,
}: ChartUserInterface): JSX.Element => {
  const userImage = image ? image : ImagePNG;

  return (
    <div
      className="chat-user-container"
      onClick={() => onSelectedConversation(email)}
    >
      <div className="chat-user">
        <div>
          <div
            style={{ backgroundColor: logged ? "#38b000" : "red" }}
            className="chat-user__logged"
          />
          <img className="chat-user__img" src={userImage} alt="name" />
        </div>
        <div className="chat-user__data">
          <p>{username}</p>
          <small>{email}</small>
        </div>
      </div>
      <div className="spacer" />
    </div>
  );
};

export default ChatUser;
