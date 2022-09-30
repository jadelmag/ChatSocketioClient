import { NavbarInterface } from "src/components/navbar/interface";
import "./navbar.scss";

export default function Navbar({ image, onLogout }: NavbarInterface) {
  return (
    <nav className="navbar">
      <div className="navbar__title">
        <p>Chat with Socket.io</p>
      </div>
      <div className="navbar__image">
        <img src={image} alt="user" />
        <button onClick={onLogout} className="outline">
          Log out
        </button>
      </div>
    </nav>
  );
}
