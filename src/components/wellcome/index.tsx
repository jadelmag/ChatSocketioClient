import { WellcomeInterface } from "src/components/wellcome/interface";
import "./wellcome.scss";

export const Wellcome = ({ logo }: WellcomeInterface): JSX.Element => {
  return (
    <div className="wellcome-chat">
      <img src={logo} alt="logo" />
      <p>Wellcome to React chat using socket.io</p>
      <small>Enjoy with your friends!</small>
    </div>
  );
};

export default Wellcome;
