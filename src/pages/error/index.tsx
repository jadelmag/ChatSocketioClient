import { useNavigate } from "react-router-dom";
import { getToken } from "src/services/storage.serveice";
import RobotPNG from "src/assets/robot.gif";
import "./error.scss";

export default function Login() {
  const navigate = useNavigate();
  const token = getToken();
  const message = {
    code: !token ? "401" : "404",
    text: !token ? "Unauthorized user" : "Ooops!! Page not found",
  };

  const handleError = () => {
    navigate("/");
  };

  return (
    <div className="chat-error" onClick={handleError}>
      <div className="chat-error__robot">
        <img src={RobotPNG} alt="robot" />
      </div>
      <div>
        <div className="starsec"></div>
        <div className="starthird"></div>
        <div className="starfourth"></div>
        <div className="starfifth"></div>
      </div>
      <div className="chat-error__message">{message.code}</div>
      <div className="chat-error__text">{message.text}</div>
    </div>
  );
}
