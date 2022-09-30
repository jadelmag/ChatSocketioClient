import { MessageInterface } from "src/components/message/interface";
import { calculateTime } from "src/utils/calculate-time.function";
import "./message.scss";

export const Message = ({
  own,
  image,
  message,
}: MessageInterface): JSX.Element => {
  return (
    <div className={`message ${own ? "own" : ""}`}>
      <div className="message-top">
        <img className="message-image" src={image} alt="message" />
        <p className="message-text">{message.text}</p>
      </div>
      <div className="message-bottom">{calculateTime(message.createdAt)}</div>
    </div>
  );
};

export default Message;
